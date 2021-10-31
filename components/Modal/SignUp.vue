<template>
  <modal
    name="sign-up"
    classes="border-modal w-full h-full"
    height="70%"
    width="60%"
    @opened="test"
  >
    <div class="p-10">
      <div class="text-center text-4xl text-black my-4">
        Sign Up!
      </div>
      <div class="flex divide-x-2 overflow-y-auto h-96">
        <div class="w-1/2 h-full flex justify-end">
          <div class="w-100 p-2.5">
            <div class="w-full flex justify-start">
              <div class="mr-7 px-4 py-2 rounded-xl border border-gray-400 text-white bg-green-500 text-xl capitalize shadow-lg cursor-pointer">
                free
              </div>
              <div class="mr-7 px-4 py-2 rounded-xl border border-gray-400 bg-white shadow-lg cursor-pointer relative overflow-hidden">
                <div class="text-black text-xl capitalize">
                  monthly
                </div>
                <div class="absolute z-10 transform rotate-45 top-0 right-0 mt-1 -mr-7 bg-red-500 uppercase text-xs text-white px-7 py-0.5">
                  sale
                </div>
              </div>
              <div class="mr-7 px-4 py-2 rounded-xl border border-gray-400 bg-white shadow-lg cursor-pointer relative overflow-hidden">
                <div class="text-black text-xl capitalize">
                  yearly
                </div>
                <div class="absolute z-10 transform rotate-45 top-0 right-0 mt-1 -mr-7 bg-red-500 uppercase text-xs text-white px-7 py-0.5">
                  sale
                </div>
              </div>
            </div>
            <div class="w-90 h-72 my-8 bg-green-600 bg-opacity-10 rounded-2xl border-green-600 border divide-y-2 divide-gray-300 px-12 py-6">
              <div class="flex justify-center items-center font-bold text-3xl pb-4">
                <div class="text-sm far fa-dollar-sign" />
                0
              </div>
              <ul class=" py-4 list-disc list-outside text-xl capitalize">
                <li>free template</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-1/2 h-full flex justify-start">
          <div class="w-100 p-2.5">
            <div class="w-full h-80 flex justify-end">
              <div id="paypal-button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SignUp',
  setup () {
    return {
    }
  },
  head () {},
  mounted () {
    // this.test()
  },
  methods: {
    test () {
      window.paypal.Buttons({
        createOrder (data, actions) {
          // This function sets up the details of the transaction, including the amount and line item details.
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [{
              description: 'test',
              amount: {
                currency_code: 'USD',
                value: 10
              }
            }]
          })
        },
        onApprove (data, actions) {
          // This function captures the funds from the transaction.
          return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            alert('Transaction completed by ' + details.payer.name.given_name)
          })
        }
      }).render('#paypal-button')
      // window.paypal.Buttons().render({
      //   env: 'sandbox', // Or 'production'
      //   // Set up the payment:
      //   // 1. Add a payment callback
      //   payment (data, actions) {
      //     // 2. Make a request to your server
      //     return actions.request.post('/my-api/create-payment/')
      //       .then(function (res) {
      //         // 3. Return res.id from the response
      //         return res.id
      //       })
      //   },
      //   // Execute the payment:
      //   // 1. Add an onAuthorize callback
      //   onAuthorize (data, actions) {
      //     // 2. Make a request to your server
      //     return actions.request.post('/my-api/execute-payment/', {
      //       paymentID: data.paymentID,
      //       payerID: data.payerID
      //     })
      //       .then(function (res) {
      //         // 3. Show the buyer a confirmation message.
      //       })
      //   }
      // }, '#paypal-button')
    }
  }
})
</script>

<style>
.border-modal {
  @apply rounded-2xl
}
</style>
