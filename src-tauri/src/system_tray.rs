use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, SystemTraySubmenu,
};

// 托盘菜单
pub fn system_tray() -> SystemTray {
    let tray = SystemTray::new().with_menu(
        SystemTrayMenu::new()
            // .add_item(CustomMenuItem::new("previous".to_string(), "上一首"))
            // .add_item(CustomMenuItem::new("next".to_string(), "下一首"))
            // .add_submenu(SystemTraySubmenu::new(
            //     "测试",
            //     SystemTrayMenu::new().add_item(CustomMenuItem::new("test1".to_string(), "测试1")),
            // ))
            // .add_native_item(SystemTrayMenuItem::Separator)
            .add_item(CustomMenuItem::new("quit".to_string(), "退出")),
    );

    tray
}

// 处理系统托盘消息
pub fn hander_system_tray(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            let window = app.get_window("main").unwrap();
            window.unminimize().unwrap();
            window.show().unwrap();
            window.set_focus().unwrap();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "hide" => {
                let window = app.get_window("main").unwrap();
                window.hide().unwrap();
            }
            _ => {}
        },
        _ => {}
    }
}
