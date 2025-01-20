
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://irmwhxualzrypvzusari.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlybXdoeHVhbHpyeXB2enVzYXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNzg1MTksImV4cCI6MjA1Mjk1NDUxOX0.2uHbvBUWqtWE0iSaQHk_J9A6_CY7HBEDuBlLC7QIGKc'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;