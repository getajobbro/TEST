import sys
import time
import traceback
from io import StringIO
from contextlib import redirect_stdout, redirect_stderr

class SafeCodeExecutor:
    def __init__(self, timeout=5, memory_limit=None):
        self.timeout = timeout
        self.memory_limit = memory_limit
        self.allowed_modules = {'math', 'random', 'datetime', 'collections', 'itertools', 're', 'json'}
        self.globals = {
            '__builtins__': {
                **{k: v for k, v in __builtins__.items() if not k.startswith('_')},
                'range': range,
                'list': list,
                'dict': dict,
                'set': set,
                'tuple': tuple,
                'str': str,
                'int': int,
                'float': float,
                'bool': bool,
                'len': len,
                'sum': sum,
                'min': min,
                'max': max,
                'sorted': sorted,
                'abs': abs,
                'round': round,
            }
        }
        
    def _import_guard(self, name, *args, **kwargs):
        if name not in self.allowed_modules:
            raise ImportError(f"Import of module '{name}' is not allowed")
        return __import__(name, *args, **kwargs)
    
    def _create_safe_globals(self):
        safe_globals = self.globals.copy()
        safe_globals['__import__'] = self._import_guard
        return safe_globals
    
    def execute_code(self, code: str, test_cases: list, func_name: str = None):
        results = []
        safe_globals = self._create_safe_globals()
        
        # Capture stdout/stderr
        stdout = StringIO()
        stderr = StringIO()
        
        try:
            with redirect_stdout(stdout), redirect_stderr(stderr):
                # Execute the user code to define functions
                exec(code, safe_globals)
                
                if func_name:
                    user_func = safe_globals.get(func_name)
                    if not callable(user_func):
                        return {
                            'success': False,
                            'error': f"Function '{func_name}' not found or not callable",
                            'results': [],
                            'stdout': stdout.getvalue(),
                            'stderr': stderr.getvalue()
                        }
                    
                    # Execute test cases
                    for test_case in test_cases:
                        if not isinstance(test_case, dict) or 'input' not in test_case:
                            continue
                            
                        args = test_case['input']
                        expected = test_case.get('expected')
                        
                        try:
                            start_time = time.time()
                            result = user_func(*args) if isinstance(args, tuple) else user_func(args)
                            exec_time = time.time() - start_time
                            
                            if exec_time > self.timeout:
                                results.append({
                                    'success': False,
                                    'result': None,
                                    'error': 'Timeout exceeded',
                                    'time': exec_time
                                })
                                continue
                                
                            results.append({
                                'success': expected is None or result == expected,
                                'result': result,
                                'expected': expected,
                                'error': None,
                                'time': exec_time
                            })
                            
                        except Exception as e:
                            results.append({
                                'success': False,
                                'result': None,
                                'error': str(e),
                                'time': 0
                            })
                
            return {
                'success': all(r['success'] for r in results),
                'results': results,
                'stdout': stdout.getvalue(),
                'stderr': stderr.getvalue()
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'traceback': traceback.format_exc(),
                'stdout': stdout.getvalue(),
                'stderr': stderr.getvalue()
            }