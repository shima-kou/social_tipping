<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            {{ 'あなたの残高: ' + user.wallet }}
          </div>

          <div class="modal-body">
            <p>送る金額</p>
            <input type="text" v-model="sendWallet" />
            <slot name="body"> </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <div class="button-wrap">
                <button class="modal-default-button" @click="$emit('sendWallet', sendWallet)">送信</button>
              </div>
              <div class="button-wrap">
                <button class="modal-default-button" @click="$emit('sendClose')">Close</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sendModal',
  data() {
    return {
      sendWallet: '',
    };
  },
  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  text-align: right;
  .button-wrap {
    & + .button-wrap {
      margin-top: 10px;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
