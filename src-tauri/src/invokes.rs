use std::path::Path;

use base64::{engine::general_purpose, Engine};
use reqwest::header::USER_AGENT;
use tauri::Window;
use tokio::{fs::OpenOptions, io::AsyncWriteExt};

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

#[derive(Clone, serde::Serialize)]
struct Payload {
    total: u64,
    done: u64,
}
/*
 * Description: [下载文件]
 * Time       : 2023/04/11 13:44:15
 *
 * @param
 *  url: 文件地址
 *  folder: 本地保存地址
 *  name_type: 文件名称 4为随机
 *  name: 名称
 *  ext: 文件名后缀
 * @return
 */
#[tauri::command]
pub async fn download(
    window: Window,
    url: String,
    path: String,
    name_type: i32,
    name: String,
    ext: String,
) -> Result<(), String> {
    let user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36";

    let client = reqwest::Client::new();
    let mut response = client
        .get(&url)
        .header(USER_AGENT, user_agent)
        .send()
        .await
        .or(Err(format!("Failed to GET from '{}'", &url)))?;

    let source_size = response
        .content_length()
        .ok_or(format!("Failed to get content length from '{}'", &url))?;

    let mut download_size: u64 = 0;

    let path = format!("{}/{}.{}", &path, name, ext);
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .open(path)
        .await
        .map_err(|err| err.to_string())?;
    while let Ok(Some(chunk)) = response.chunk().await {
        download_size += chunk.len() as u64;

        window
            .emit(
                "progress",
                Payload {
                    total: source_size,
                    done: download_size,
                },
            )
            .unwrap();

        file.write(&chunk)
            .await
            .or(Err(format!("Error while writing to file")))?;
    }

    Ok(())
}

#[tauri::command]
pub async fn exist(path: String) -> bool {
    Path::new(&path).exists()
}
