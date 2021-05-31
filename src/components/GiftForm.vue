<template>
    <div class="column">
        <ValidationObserver ref="giftForm">
            <div class="shadow">
            <h3 class="has-text-weight-semibold gift-title">Gift information</h3>
            <div id="giftAmount">
                <div class="is-inline-flex">
                    <b-field
                            label="Select gift amount"
                            custom-class="has-text-weight-light is-size-14"
                            grouped
                            group-multiline
                    >
                        <b-radio-button
                                v-for="price in giftOptions" :key="price.id"
                                :native-value="Math.round(price.attributes.price_min.amount)"
                                type="is-info"
                                class="mr-3 radio-button has-text-dark has-text-weight-medium"
                                v-model="giftForm.amount"
                        >${{Math.round(price.attributes.price_min.amount)}}</b-radio-button>
                        <b-radio-button
                                native-value="custom"
                                type="is-info"
                                class="mr-3 radio-button has-text-dark has-text-weight-medium"
                                v-model="giftForm.amount"
                        >Custom</b-radio-button
                        >
                    </b-field>
                </div>
                <ValidationProvider
                        v-if="giftForm.amount == 'custom'"
                        rules="required"
                        name="gift amount"
                        v-slot="{ errors }"
                >
                    <b-field id="customAmount" class="spacer-top-22">
                        <p class="control">
                            <span class="button is-static has-background-white has-text-dark">$</span>
                        </p>
                        <b-input
                            v-model="giftForm.amountCustom"
                            placeholder="Enter custom amount"
                            type="number"
                        ></b-input>
                    </b-field>
                    <span
                            v-for="error in errors"
                            :key="error.id"
                            class="help has-text-danger custom-amount-error"
                    >{{ error }}</span
                    >
                </ValidationProvider>
            </div>


            <div id="giftDelivery">
                <div class="is-inline-flex">
                    <b-field
                        label="Delivery type"
                        custom-class="has-text-weight-light is-size-14"
                        grouped
                        group-multiline
                    >
                        <b-radio
                            v-for="(delivery,index) in deliveryType" :key="index"
                            :native-value="delivery.value"
                            type="is-info"
                            class="mr-3 radio-button has-text-dark has-text-weight-medium"
                            v-model="giftForm.deliveryType">
                            {{delivery.label}}
                        </b-radio>
                    </b-field>
                </div>
            </div>

            <b-field
                v-if="giftForm.deliveryType == 'gift'"
                grouped
                group-multiline
            >
                <ValidationProvider
                        rules="required"
                        name="sender name"
                        v-slot="{ errors }"
                        class="mr-20"
                >
                    <b-field
                            label="Sender name"
                            class="spacer-top-22"
                            custom-class="has-text-dark has-text-weight-medium"
                            expanded
                    >
                        <b-input
                                v-model="giftForm.senderName"
                                placeholder="Enter sender name"
                                expanded
                                type="text"
                        ></b-input>
                    </b-field>
                    <span
                            v-for="error in errors"
                            :key="error.id"
                            class="help has-text-danger mb-5"
                    >{{ error }}</span
                    >
                </ValidationProvider>
                <ValidationProvider
                        rules="required"
                        name="recipient name"
                        v-slot="{ errors }"
                >
                    <b-field
                            label="Recipient name"
                            class="spacer-top-22"
                            custom-class="has-text-dark has-text-weight-medium"
                    >
                        <b-input
                                v-model="giftForm.recipientName"
                                placeholder="Enter recipient name"
                                type="text"
                        ></b-input>
                    </b-field>
                    <span
                            v-for="error in errors"
                            :key="error.id"
                            class="help has-text-danger mb-5"
                    >{{ error }}</span
                    >
                </ValidationProvider>
            </b-field>
            <b-field grouped group-multiline>
                <ValidationProvider
                        rules="required"
                        name="recipient email"
                        v-slot="{ errors }"
                >
                    <b-field
                        label="Recipient email"
                        class="spacer-top-22"
                        custom-class="has-text-dark has-text-weight-medium"
                    >
                        <b-input
                            v-model="giftForm.recipientEmail"
                            placeholder="Enter recipient email"
                            expanded
                            class="mr-20"
                            type="email"
                        ></b-input>
                    </b-field>
                    <span
                        v-for="error in errors"
                        :key="error.id"
                        class="help has-text-danger mb-5">
                        {{ error }}
                    </span>
                </ValidationProvider>
                <ValidationProvider
                        rules="required"
                        name="recipient phone"
                        v-slot="{ errors }"
                >
                    <b-field
                            label="Recipient phone"
                            class="spacer-top-22 mr-20"
                            custom-class="has-text-dark has-text-weight-medium"
                    >
                        <p class="control">
                            <span class="button is-static has-background-white has-text-dark">+65</span>
                        </p>
                        <b-input
                                v-model="giftForm.recipientPhone"
                                placeholder="Enter recipient phone"
                                expanded
                                type="number"
                        ></b-input>
                    </b-field>
                    <span
                        v-for="error in errors"
                        :key="error.id"
                        class="help has-text-danger mb-5">
                        {{ error }}
                    </span>
                </ValidationProvider>
            </b-field>
                <div v-if="giftForm.deliveryType === 'gift'">
                    <b-field
                            label="Delivery time"
                            custom-class="has-text-dark has-text-weight-medium"
                            class="spacer-top-22"
                    >
                        <b-radio
                                v-for="(item, index) in deliveryTime"
                                :key="index"
                                v-model="giftForm.deliveryTime"
                                :native-value="item.value"
                                type="is-info"
                                class="mr-5 has-text-dark has-text-weight-normal"
                        >{{ item.label }}</b-radio
                        >
                    </b-field>
                    <b-field v-if="giftForm.deliveryTime == 'custom'" grouped group-multiline>
                        <ValidationProvider
                                rules="required"
                                name="delivery date"
                                v-slot="{ errors }"
                                class="mr-20"
                        >
                            <b-field
                                    label="Delivery date"
                                    class="spacer-top-22"
                                    custom-class="has-text-dark has-text-weight-medium"
                            >
                                <b-datepicker
                                        placeholder="Select delivery date"
                                        icon="calendar-today"
                                        :min-date="new Date()"
                                        editable
                                        class="has-icons-right"
                                        v-model="giftForm.deliveryDate"
                                >
                                </b-datepicker>
                            </b-field>
                            <span
                                    v-for="error in errors"
                                    :key="error.id"
                                    class="help has-text-danger mb-5"
                            >{{ error }}</span
                            >
                        </ValidationProvider>
                        <b-field
                                label="Period"
                                class="spacer-top-22"
                                custom-class="has-text-dark has-text-weight-medium"
                        >
                            <b-radio-button
                                    v-for="(item, index) in periods"
                                    :key="index"
                                    v-model="giftForm.period"
                                    :native-value="item.value"
                                    type="is-info"
                                    class="mr-3 radio-button has-text-dark has-text-weight-medium"
                            >{{ item.label }}</b-radio-button
                            >
                        </b-field>
                    </b-field>
                    <ValidationProvider
                            rules="required"
                            name="gift message"
                            v-slot="{ errors }"
                    >
                        <b-field
                                label="Gift message"
                                custom-class="has-text-dark has-text-weight-medium"
                                class="spacer-top-22"
                        >
                            <b-input
                                    v-model="giftForm.message"
                                    type="textarea"
                                    class="is-info"
                                    placeholder="Enter gift message"
                            ></b-input>
                        </b-field>
                        <span
                                v-for="error in errors"
                                :key="error.id"
                                class="help has-text-danger"
                        >{{ error }}</span
                        >
                    </ValidationProvider>
                </div>

            <b-field class="is-flex is-justify-content-flex-end spacer-top-22">
                <b-button class="is-info" @click="send">Send</b-button>
            </b-field>
        </div>
        </ValidationObserver>

        <b-modal v-model="modalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-content">
                    <div>
                        Gift amount: {{giftForm.amount ? giftForm.amount : giftForm.amountCustom}}
                    </div>
                    <div>Delivery type: {{giftForm.deliveryType}} </div>
                    <div>Recipient email: {{giftForm.recipientEmail}}</div>
                    <div>Recipient phone: {{giftForm.recipientPhone}}</div>
                    <div v-if="giftForm.senderName">Sender name: {{giftForm.senderName}}</div>
                    <div v-if="giftForm.deliveryDate">Delivery: {{giftForm.deliveryDate}}</div>
                    <div v-if="giftForm.message">Message: {{giftForm.message}}</div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    export default {
        name: "GiftForm",
        props:["data"],
        data(){
            return{
                giftForm:{
                    amount:10,
                    deliveryType: 'personal',
                    recipientEmail: '',
                    recipientPhone: '',
                    amountCustom: "",
                    deliveryTime: "immediately",
                    period: "afternoon",
                    senderName: "",
                    recipientName: "",
                    message: "",
                    deliveryDate: null
                },
                modalActive: false,
                giftOptions:[],
                deliveryType: [
                    {
                        label: "Personal",
                        value: "personal",
                    },
                    {
                        label: "Send as gift",
                        value: "gift",
                    },
                ],
                deliveryTime: [
                    {
                        label: "Immediately",
                        value: "immediately",
                    },
                    {
                        label: "Custom",
                        value: "custom",
                    },
                ],
                periods: [
                    {
                        label: "Morning",
                        value: "morning",
                    },
                    {
                        label: "Afternoon",
                        value: "afternoon",
                    },
                    {
                        label: "Evening",
                        value: "evening",
                    },
                ]
            }
        },
        mounted() {
          this.data.find(item=>{
              if(item.type === 'products'){
                  this.giftOptions.push(item)
              }
          })
        },
        computed:{
            brandProducts(){
                let name
                this.data.find(item=>{
                    if(item.type === 'products'){
                        name=item.attributes.name
                    }
                });
                return name;
            },
        },
        methods:{
            send(){
                this.$refs.giftForm.validate().then((valid) => {
                    if (!valid) {
                        return this.$buefy.toast.open({
                            message: "Please fill in all fields",
                            type: "is-danger",
                        });
                    }
                    this.modalActive = true
                    //this.$refs.confirmationModal.openModal();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #giftAmount, #giftDelivery{
        margin-bottom: 40px;
    }
    h3{
        font-size: 18px;
        margin-bottom: 23px;
    }
    .shadow{
        padding: 20px;
    }
    #customAmount{
        margin-top: 20px;
    }
    .spacer-top-22{
        padding-top: 1.375rem;
    }
</style>
