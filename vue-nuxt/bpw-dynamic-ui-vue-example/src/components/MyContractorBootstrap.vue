<template>
  <b-card class="form">
    <div>
      <div>
        <h3>Translation</h3>
        <language-changer></language-changer>
        <load-bundle></load-bundle>
        <p>$t: {{ $t("message.hello") }}</p>
      </div>
      <div>
        <h3>Interpolation</h3>
        <i18next path="term" tag="label" for="tos">
          <a href="#" target="_blank">{{ $t("tos") }}</a>
          <strong>a</strong>
        </i18next>
      </div>
      <div>
        <h3>Prefix</h3>
        <key-prefix></key-prefix>
      </div>
      <div>
        <h3>Interpolation</h3>
        <inline-translations></inline-translations>
      </div>
    </div>
    <div class="container-fluid">
      <b-form-bootstrap ref="formModel" :formModel="formModel" v-model="model">
        <b-button type="button" v-on:click="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form-bootstrap>
    </div>
  </b-card>
</template>
<script>
import { formModel } from '../formModel/mycontractor'
export default {
  name: 'my-contractor',
  data: () => ({
    formModel: formModel,
    model: {
      name: {
        firstName: 'Frank',
        lastName: 'Li'
      },
      email: 'frank.x.li@gmail.com',
      agency: 'DAS',
      jobDescription: 'Portal development',
      agree: 'not_accepted',
      addresses: [{
        address: {
          street: 'street1',
          town: 'town1',
          zip: 'zip1'
        }
      }, {
        address: {
          street: 'street2',
          town: 'town2',
          zip: 'zip2'
        }
      }]
    }
  }),
  methods: {
    submit (e) {
      // this.$refs.formModel.form() returns the ElementUI's form instance
      /*
      this.$refs.formModel.form().validate((valid) => {
        if (valid) {
          this.$refs.formModel.clearErrorMessage()
        } else {
          this.$refs.formModel.setErrorMessage('Please fill out the required fields')
          return false
        }
      })
      */
      console.log(this.model)
      return false
    }
  }
}
</script>

<style>
  .form {
    text-align: left;
    width: 600px;
    margin: auto;
  }

  h2 {
    font-size: 1.7em;
    text-align: center;
    margin-top: 0;
    margin-bottom: .2em
  }

  h2 + small {
    display: block;
    text-align: center;
    margin-bottom: 1.2em
  }

  small {
    line-height: 20px;
    display: block;
  }

  .el-alert {
    margin-bottom: 15px
  }
</style>
