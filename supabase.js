import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xlsgxzcfqdkogcrckfzf.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsc2d4emNmcWRrb2djcmNrZnpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3NDczNzAsImV4cCI6MTk3MDMyMzM3MH0.3oEIhX8S5VzqMpzqQ-Z27n802nzRmk5xdbt-ok0hkyI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage,
    persistSession: true,
    detectSessionInUrl: false,
});
