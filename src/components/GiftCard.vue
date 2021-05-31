<template>
    <div v-if="brandDetails" class="columns pt-0">
        <brand :data="brandDetails"></brand>
        <gift-form :data="brandDetails.data.included"></gift-form>
    </div>
</template>

<script>
    import Brand from "./Brand";
    import GiftForm from "./GiftForm";
    export default {
        name: "GiftCard",
        components:{GiftForm, Brand},
        data(){
            return{
                brandDetails: null
            }
        },
        mounted() {
            this.axios.get("https://mocki.io/v1/4d113632-26ac-4547-a818-117e2ced1cc5").then((response)=>{
                console.log(response)
                this.brandDetails = response.data
            })
        }
    }
</script>

<style scoped>

</style>
