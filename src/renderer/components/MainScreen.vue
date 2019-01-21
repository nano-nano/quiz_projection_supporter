<template>
  <div>
    <!-- Navigation bar -->
    <div class="container-flued">
      <b-navbar toggleable="md" type="dark" variant="secondary">
        <b-navbar-brand href="#">Quiz Projection Supporter</b-navbar-brand>
          <b-navbar-nav>
            <b-nav-item href="#" @click="onClickProjectionScreenLink()">Open PJ Screen</b-nav-item>
            <b-nav-item href="#" disabled>PJ Setting</b-nav-item>
          </b-navbar-nav>
      </b-navbar>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8">
          <!-- 現在表示中の問題 -->
          <question-card title="Current Displayed" v-bind:qNo=displayedQNo></question-card>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="toUpTriangle">▲▲▲</div>
      </div>

      <div class="row justify-content-center">
        <div class="col-3">
          <!-- ひとつ前の問題 -->
          <question-card title="Prev" qNo="###"></question-card>
        </div>

        <div class="col-6 align-self-center">
          <!-- 表示候補の問題 -->
          <question-card title="Displayed Candidate" qNo="###"></question-card>
        </div>

        <div class="col-3">
          <!-- ひとつ次の問題 -->
          <question-card title="Next" qNo="###"></question-card>
        </div>
      </div>

      <div class="row justify-content-center buttonArea">
        <div class="col-3">
          <b-button size="lg" variant="outline-secondary" block>
            ＜＜ Prev
          </b-button>
        </div>

        <div class="col-6">
          <p>
            <b-button size="lg" variant="primary" block @click="onClickShowCandidate()">
              Show Candidate
            </b-button>
          </p>
          <p class="text-center">
            <b-button size="lg" variant="outline-secondary">
              Disable Question
            </b-button>
            <b-button size="lg" variant="outline-secondary">
              Select by QuestionID
            </b-button>
          </p>
          <p>
            <b-form-checkbox size="lg" v-model="isDisplayAnotherAnswers">
              Display AnotherAnswers
            </b-form-checkbox>
          </p>
        </div>

        <div class="col-3">
          <b-button size="lg" variant="outline-secondary" block>
            Next ＞＞
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QuestionCard from './MainScreen/QuestionCard'

  export default {
    name: 'main-screen',
    components: {
      QuestionCard
    },
    data () {
      return {
        isDisplayAnotherAnswers: false,
        displayedQNo: 100,
        isProjectionScreenOpened: false
      }
    },
    methods: {
      onClickShowCandidate () {
        // ダミー実装
        this.displayedQNo++
        console.debug(this.displayedQNo)
      },
      onClickProjectionScreenLink () {
        // ダミー実装
        this.isProjectionScreenOpened = !this.isProjectionScreenOpened
        console.debug(this.isProjectionScreenOpened)
        this.$router.push('projection')
      }
    }
  }
</script>

<style>
  .toUpTriangle {
    font-size: 200%;
  }
  .buttonArea {
    margin-top: 20px;
  }
</style>
