<template>
  <div style="display: flex;flex-direction: column;align-items: center;">
    <div class=" login-password">
      <div class="login-password-icon">
        <span class="iconfont wyy-music"></span>
      </div>
      <div class="login-input">
        <div class="phone-area">
          <el-select v-model="area" placeholder="Select" class="input input-area" :prefix-icon="Lock">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
              <span style="float: left">{{ item.labelText }}</span>
              <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">{{ item.value }}</span>
            </el-option>
          </el-select>
          <el-input v-model="phone" class="input input-phone" placeholder="请输入手机号" />
        </div>
        <div><el-input v-model="password" placeholder="请输入密码" class="input" :prefix-icon="Lock" /></div>
      </div>
      <div class="login-tips">
        <div></div>
        <div class="login-tips-right">
          <div>忘记密码</div>
          <div>|</div>
          <div>验证码登录</div>
        </div>
      </div>
      <div class="login-button">
        <el-button color="#ff3a3a" @click="login()">登 录</el-button>
        <div>注册</div>
      </div>
    </div>
  </div>
  <div class="other-login"></div>
  <div class="provisions">
    同意《服务条款》《隐私政策》《儿童隐私政策》
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Lock } from '@element-plus/icons-vue'
import api from '../../api/index'
import { Md5 } from 'ts-md5'

// 登录方式，手机密码|手机验证码等  phoneWithPassword | phoneWithCaptcha
let loginType = ref('phoneWithPassword');
let phone = ref("");
let password = ref("");
const area = ref('+86')
const cities = [
  {
    value: '+86',
    label: '+86',
    labelText: '中国',
  }
]

function login() {
  if (loginType.value == 'phoneWithPassword') {
    api.loginWithEmail({ email: phone.value, md5_password: Md5.hashStr(password.value) }).then((res) => {
    })
  } else if (loginType.value == 'phoneWithCaptcha') {

  }
}

</script>

<style lang="less" scoped>
.login-password {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  max-width: 270px;

  .login-password-icon {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 38px;

    .iconfont {
      font-size: 60px;
      color: #ff3a3a;
    }
  }

  .login-input {
    padding: 10px 0px;


    .phone-area {
      display: flex;

      .input-area {
        width: 80px;
      }

      .input-phone {
        flex: 1;
      }
    }
  }


  // 忘记密码，验证码登录这块的
  .login-tips {
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: space-between;
    font-size: 10px;

    .login-tips-right {
      display: flex;
      color: #217fc6;

      div {
        margin-left: 10px;
      }
    }
  }

  // 登录按钮
  .login-button {
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      margin-top: 10px;
    }

    .el-button {
      width: 100%;
      height: 40px;
    }
  }
}

// 其他登录方式(留空)
.other-login {
  height: 90px;
}

// 同意条款相关内容
.provisions {
  display: flex;
  justify-content: center;
  font-size: 10px;
}

.input {
  height: 40px;
}

:deep(.select-trigger) {
  height: 40px;

  .el-input--suffix {
    height: 100%;
  }
}

:deep(.el-input__wrapper) {
  border-radius: 0px;
}

:deep(.el-select-dropdown) {
  width: 750px;
}
</style>