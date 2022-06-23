import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lcbokqxjetbeocqavwjb.supabase.co";
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjYm9rcXhqZXRiZW9jcWF2d2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ0ODY3NDMsImV4cCI6MTk3MDA2Mjc0M30.4SL5oESC3A-sgB0VftULXrgUI5jgqvHuCtlWJeDfk-M'
    ;
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage,
    persistSession: true,
    detectSessionInUrl: true,
});
