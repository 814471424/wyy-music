use base64::{engine::general_purpose, Engine};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn _greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 根据前端传过来的本地音乐地址返回对应的base64数据
#[tauri::command]
pub fn read_file_to_base64(file_url: String) -> Option<String> {
    std::fs::read(file_url)
        .ok()
        .map(|v| general_purpose::STANDARD.encode(v))
}
