<template>
  <div class="app-link-preview">
    <template v-if="$props.url">
      <link-prevue :url="$props.url">
        <template slot-scope="props">
          <div class="link-preview-card">
            <div class="thumbnail-container">
              <img class="thumbnail" :src="props.img" :alt="props.title" />
            </div>
            <div class="content-container">
              <div class="link-title">{{props.title.substring(0, 50)}}...</div>
              <div class="link-description">{{props.description.substring(0, 100)}}...</div>
              <div class="link-actions">
                <a :href="props.url" target="_blank">
                  <img src="@/assets/icons/preview.svg" />
                </a>
              </div>
            </div>
          </div>
        </template>
        <template slot="loading">
          <div class="link-loading">Loading Preview</div>
        </template>
      </link-prevue>
    </template>
  </div>
</template>

<script>
import LinkPrevue from "link-prevue";

export default {
  methods: {},
  props: ["url"],
  components: {
    LinkPrevue
  }
};
</script>

<style lang="scss">
@import "~simplemde/dist/simplemde.min.css";

.app-link-preview {
    color: white;
  .link-loading {
    height: 10rem;
    width: 100%;
    display: flex;
    justify-content: center;
    background: #222;
    align-items: center;
    color: #cccccc;
  }

  .link-preview-card {
    display: flex;
    height: 10rem;
    border-radius: 5px;
    overflow: hidden;
    padding: 5px;
    background: #222;
    border: 1px solid #222;

    .thumbnail-container {
      flex: 0 0 30%;
      border-radius: 5px;
      overflow: hidden;

      img {
        height: 100%;
      }
    }

    .content-container {
      padding: 0 5px;
      margin-left: 5px;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .link-title {
        font-size: 1.2rem;
      }

      .link-description {
        color: #bbbbbb;
      }
    }
  }
}
</style>