<style scoped>
.top-pad-large {
  height: 55px;
}

.top-pad-mobile {
  height: 35px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-col {
  border: 1px solid #b3b3b3;
  background: white;
  padding: 20px;
}
</style>

<template>
  <div class='AccountsFormContainer'>
    <!-- mobile <-> large theme transition trigger -->
    <media :query='{ maxWidth: 768 }' @media-enter='handleEnterMobile'>
    </media>
    <media :query='{ minWidth: 768 }' @media-enter='handleEnterLarge'>
    </media>

    <media :query='{ minWidth: 768 }'>
      <div class='top-pad-large'>
      </div>
    </media>
    <media :query='{ maxWidth: 768 }'>
      <div class='top-pad-mobile'>
      </div>
    </media>
    <Row>
      <Col 
        :xs='24' 
        :sm='{ span: 14, push: 5 }' 
        :lg='{ span: 10, push: 7 }'
        class='form-col'
      >
        <h1 class='form-title'>{{ title }}</h1>
        <slot></slot>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from 'vuex-alt';
import Media from 'vue-media';

export default {
  components: {
    Media
  },
  created() {
    this.setLayoutThemeDark();
  },
  destroyed() {
    this.setLayoutThemeLight()
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    ...mapActions({
      setLayoutThemeLight: (actions) => actions.layout.setLayoutThemeLight,
      setLayoutThemeDark: (actions) => actions.layout.setLayoutThemeDark
    }),
    handleEnterMobile() {
      this.setLayoutThemeLight()
    },
    handleEnterLarge() {
      this.setLayoutThemeDark()
    }
  }
}
</script>