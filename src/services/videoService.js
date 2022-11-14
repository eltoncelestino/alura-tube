import { supabase } from '../utils/supabase';

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video")
        .select("*")
    }
  }
}