<template>
  <div class="modal" :class="$store.state.editModalShow ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-content main">

      <header class="modal-card-head">
        <p class="modal-card-title">文章详情</p>
        <button class="delete" aria-label="close" @click="$store.commit('CLOSE_EDIT_MODAL')"></button>
      </header>

      <form @submit.prevent="handleUpdate">
        <section class="modal-card-body">
          <!-- <pre>{{ $store.state.isEditingArticle.content }}</pre> -->
          <div class="field">
            <label class="label">文章标题</label>
            <div class="control">
              <input class="input" type="text" required="required" placeholder="请输入文章标题" :value="$store.state.isEditingArticle.title" @input="handleInput" data-type="title">
            </div>
          </div>

          <div class="field">
            <label class="label">分类</label>
            <p class="help is-info">用'-'号分隔</p>
            <div class="control">
              <input class="input" type="text" required="required" placeholder="请输入文章分类" :value="$store.state.isEditingArticle.topic" @input="handleInput" data-type="topic">
            </div>
                
          </div>

          <div class="field">
            <label class="label">文章内容</label>
            <p class="help is-info">请使用Markdown格式</p>
            <div class="control">
              <div class="control">
                <textarea class="textarea" required="required" placeholder="Textarea" :value="$store.state.isEditingArticle.content" @input="handleInput" data-type="content"></textarea>
              </div>
            </div>
          </div>
        
        </section>

        <footer class="modal-card-foot">
          <button class="button is-success" type="submit" >保存更改</button>
          <button class="button" @click="$store.commit('CLOSE_EDIT_MODAL')">取消</button>
        </footer>
      </form>
      
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        article: {}
      }
    },
    methods: {
      handleInput(e) {
        let type = e.target.dataset.type
        let value = e.target.value
        this.article[type] = value
      },
      handleUpdate() {
        let data = {
          ...this.article
        }
        console.log(data)
        this.$store.dispatch('editConfirm', data)
      }
    }
  }
</script>

<style scoped>
.main {
  width: 80vw;
  min-height: 80vh;
}

.textarea {
  min-height: 40vh;
}
</style>