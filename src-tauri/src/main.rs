// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod invokes; // 给前端的方法
mod system_tray; // 系统托盘
mod web; // web请求相关

fn main() {
    tauri::Builder::default()
        .system_tray(system_tray::system_tray())
        .on_system_tray_event(system_tray::hander_system_tray)
        .register_uri_scheme_protocol("stream", web::hander_stream)
        .invoke_handler(tauri::generate_handler![invokes::read_file_to_base64,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
