<template>
    <div class="column is-one-fifth">
        <div class="shadow">
            <img :src="data.data.attributes.logo.list.url" alt="logo" class="logo is-flex">
            <hr class="m-0">
            <div class="has-text-centered brand-name">
                <div id="name" class="brand-name has-text-centered title has-text-weight-semibold p-0">
                    {{ data.data.attributes.name }}
                </div>
                <b-taglist class="is-flex is-justify-content-center">
                    <b-tag :type="data.data.attributes.active ? 'is-success is-light has-text-success':'is-danger'">
                        {{data.data.attributes.active? 'active':'inactive'}}
                    </b-tag>
                </b-taglist>
            </div>
            <div class="brand-overview columns is-multiline">
                <div class="column is-12">
                    <div v-if="brandCountry" class="column is-12 has-text-centered border">
                        <div class="is-size-7">country</div>
                        <div class="is-size-14">{{brandCountry}}</div>
                    </div>
                </div>
                <div class="column">
                    <div class="is-flex-mobile">
                        <div class="column is-12-desktop is-3-mobile item py-0">
                            <div class="column is-12 py-0">
                                <div class="is-size-7">Id</div>
                                <div class="is-size-14">{{data.data.id}}</div>
                            </div>
                        </div>
                        <div class="column is-12-desktop is-3-mobile item py-0">
                            <div class="column is-12 py-0">
                                <div class="is-size-7">Company</div>
                                <div class="is-size-14">{{brandCompany}}</div>
                            </div>
                        </div>
                        <div class="column is-12-desktop is-3-mobile item py-0">
                            <div class="column is-12 py-0">
                                <div class="is-size-7">Company</div>
                                <div class="is-size-14">{{brandCategory}}</div>
                            </div>
                        </div>
                        <div class="column is-12-desktop is-3-mobile item py-0">
                            <div class="column is-12 py-0">
                                <div class="is-size-7">Company</div>
                                <div class="is-size-14">{{data.data.attributes.phone}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="keywords-container columns">
                <div class="is-size-7 column is-12">
                    <span class="column is-12">Keywords</span>
                    <b-taglist class="column is-12 is-align-items-flex-start mt-0 pt-0">
                        <b-tag
                                v-for="(keyword,index) in data.data.attributes.keywords.slice(0, 4)"
                                :key="index"
                        >
                            {{keyword}}
                        </b-tag>

                        <b-collapse
                                v-if="data.data.attributes.keywords.length > 4"
                                :open="false"
                                position="is-bottom"
                                aria-id="keywords"
                                class="is-inline-flex cursor-pointer"
                        >
                            <template #trigger="props">
                                <b-tag type="is-info is-light" aria-controls="keywords">
                                    <span>+ {{ data.data.attributes.keywords.length - 4 }} </span>
                                    <font-awesome-icon
                                            :icon="!props.open ? 'chevron-down' : 'chevron-up'"
                                            size="sm"
                                    ></font-awesome-icon>
                                </b-tag>
                            </template>
                            <b-tag v-for="(tag, index) in data.data.attributes.keywords.slice(4)" :key="index">{{tag}}</b-tag>
                        </b-collapse>
                    </b-taglist>
                </div>
            </div>
            <hr>
            <div class="social columns">
                <div class="column is-12">
                    <div class="column is-12 is-flex is-justify-content-space-evenly">
                        <a :href="data.data.attributes.externalUrls.website">
                            <font-awesome-icon icon="globe" size="lg" style="color: grey;"></font-awesome-icon>
                        </a>
                        <a :href="data.data.attributes.externalUrls.facebook">
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }" size="lg" style="color: grey;"></font-awesome-icon>
                        </a>
                        <a :href="data.data.attributes.externalUrls.insatgram">
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" size="lg" style="color: grey;"></font-awesome-icon>
                        </a>
                        <a :href="data.data.attributes.externalUrls.twitter">
                            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }" size="lg" style="color: grey;"></font-awesome-icon>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Brand",
        props:["data"],
        mounted() {
            console.log(this.data.data)
        },
        computed:{
            brandCountry(){
                // const detail = this.data.data.included.filter(item=>item.type==='countries');
                // return detail.find(item=>item.attributes);
                let name
                this.data.data.included.filter(item=>{
                    if(item.type === 'countries'){
                        name=item.attributes.name
                    }
                });
                return name;
            },
            brandCompany(){
                let name
                this.data.data.included.filter(item=>{
                    if(item.type === 'companies'){
                        name=item.attributes.name
                    }
                });
                return name;
            },
            brandCategory(){
                let name
                this.data.data.included.filter(item=>{
                    if(item.type === 'categories'){
                        name=item.attributes.name
                    }
                });
                return name;
            }
        }
    }
</script>

<style lang="scss" scoped>
.logo{
    padding: 61px 40px;
    margin: 0 auto;
    @media only screen and (max-width: 992px) {
        padding: unset;
    }
}
.brand-name{
    padding: 21px 0px;
    #name{
        font-size: 22px;
        margin-bottom: 10px;
    }
}
    .brand-overview{
        .item{
            margin-bottom: 11px;
        }
    }
hr{
    margin: 10px 0px;
}
</style>
