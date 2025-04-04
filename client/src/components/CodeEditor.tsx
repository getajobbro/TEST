Here's the code to create a Monaco editor component with Python syntax highlighting, line numbers, and a run button:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Python Monaco Editor</title>
    <style>
        #container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100%;
        }
        #editor {
            height: 80%;
            width: 100%;
        }
        #run-button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
            width: 100px;
        }
        #output {
            border: 1px solid #ccc;
            padding: 10px;
            margin: 10px;
            height: 15%;
            overflow: auto;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="editor"></div>
        <button id="run-button">Run</button>
        <div id="output"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs/loader.min.js"></script>
    <script>
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' }});
        
        let editor;
        require(['vs/editor/editor.main'], function() {
            editor = monaco.editor.create(document.getElementById('editor'), {
                value: '# Write your Python code here\nprint("Hello, World!")',
                language: 'python',
                theme: 'vs-dark',
                automaticLayout: true,
                lineNumbers: 'on',
                minimap: { enabled: true },
                scrollBeyondLastLine: false
            });
        });

        document.getElementById('run-button').addEventListener('click', function() {
            const code = editor.getValue();
            const outputElement = document.getElementById('output');
            
            outputElement.textContent = "Running code...";
            
            // This is a placeholder for your actual evaluation engine
            // Replace this with your actual API call to your evaluation engine
            setTimeout(() => {
                try {
                    // In a real implementation, you would send the code to your backend
                    // and display the response here
                    outputElement.textContent = "Output:\n" + 
                        "Hello, World!\n" + 
                        "Code executed successfully.";
                } catch (error) {
                    outputElement.textContent = "Error:\n" + error.message;
                }
            }, 500);
        });
    </script>
</body>
</html>
```

Note: This implementation includes a mock evaluation engine that simulates code execution. In a real application, you would replace the `setTimeout` block with an actual API call to your backend evaluation engine. The Monaco editor is loaded from a CDN for simplicity.