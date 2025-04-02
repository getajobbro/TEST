Here's a Supabase client wrapper for server-side operations with TypeScript and proper error handling:

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types'; // Generated types from your database

class SupabaseServerClient {
  private client: SupabaseClient<Database>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Service Role Key must be provided');
    }

    this.client = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  async query<T = any>(
    table: string,
    operation: 'select' | 'insert' | 'update' | 'delete',
    params?: {
      columns?: string;
      filter?: Record<string, any>;
      body?: Record<string, any>;
      limit?: number;
    }
  ): Promise<{ data: T | null; error: Error | null }> {
    try {
      let query = this.client.from(table);

      if (params?.columns) {
        query = query.select(params.columns);
      }

      if (params?.filter) {
        for (const [key, value] of Object.entries(params.filter)) {
          query = query.eq(key, value);
        }
      }

      if (params?.limit) {
        query = query.limit(params.limit);
      }

      let result;
      switch (operation) {
        case 'select':
          result = await query;
          break;
        case 'insert':
          if (!params?.body) {
            throw new Error('Insert operation requires a body');
          }
          result = await query.insert(params.body);
          break;
        case 'update':
          if (!params?.body) {
            throw new Error('Update operation requires a body');
          }
          result = await query.update(params.body);
          break;
        case 'delete':
          result = await query.delete();
          break;
        default:
          throw new Error('Invalid operation');
      }

      if (result.error) {
        throw result.error;
      }

      return { data: result.data as T, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  async rpc<T = any>(
    fnName: string,
    params?: Record<string, any>
  ): Promise<{ data: T | null; error: Error | null }> {
    try {
      const { data, error } = await this.client.rpc(fnName, params);

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: error instanceof Error ? error : new Error(String(error)) };
    }
  }

  getClient(): SupabaseClient<Database> {
    return this.client;
  }
}

export default SupabaseServerClient;
```

To use this wrapper:

```typescript
// Example usage
const supabase = new SupabaseServerClient();

// Select example
const { data, error } = await supabase.query('users', 'select', {
  columns: 'id, name, email',
  filter: { active: true },
  limit: 10
});

// Insert example
const { data: inserted, error: insertError } = await supabase.query('users', 'insert', {
  body: { name: 'John', email: 'john@example.com' }
});

// RPC example
const { data: rpcResult, error: rpcError } = await supabase.rpc('custom_function', { param1: 'value' });
```