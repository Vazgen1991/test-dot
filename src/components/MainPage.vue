<template>
    <div class="container ">
        <div class="main_block m-t-40">
            <h1>FTL: Прямая машина</h1>

            <form class="form" action="#">
                <div class="info">
                    <p>Для расчета стоимости необходимо ввести параметры груза, пункты отправки и прибытия.</p>
                </div>
                <section>
                    <div class="form_block_item m-t-25 ">
                        <div class="flex align-center">
                            <span class="circle">1</span>
                            <h2 class="form_block_item_heading">Маршрут</h2>
                        </div>
                        <div class="flex flex-direction m-t-15">
                            <label class="form_block_item_label" maxlength="80" for="from">Откуда</label>
                            <input class="form_block_item_input" maxlength="80" id="from" type="text"  name="from" v-model="from">

                        </div>
                        <div class="flex flex-direction m-t-15">
                            <label class="form_block_item_label" for="to">Куда</label>
                            <input class="form_block_item_input" maxlength="80" id="to" type="text" value="" name="to" v-model="to" >
                        </div>
                    </div>
                    <div class="form_block_item m-t-45">
                        <div class="flex align-center m-b-15">
                            <span class="circle">2</span>
                            <h2 class="form_block_item_heading">Транспорт</h2>
                        </div>

                        <div class="flex justify-between form_block_item_select_block ">
                            <div class="select_sm">
                                <span class="specific_margin">Грузоподъёмность</span>
                                <multiselect
                                        v-model="value"
                                        placeholder="Не выбрана"
                                        :options="options">

                                </multiselect>
                            </div>
                            <div class="select_sm">
                                <span class="specific_margin">Способ погрузки</span>
                                <multiselect
                                        v-model="type"
                                        :options="typeOptions">

                                </multiselect>
                            </div>


                        </div>
                    </div>
                    <div class="form_block_item m-t-45">
                        <div class="flex align-center m-b-15">
                            <span class="circle">3</span>
                            <h2 class="form_block_item_heading">Груз</h2>
                        </div>
                            <div class="form_block_item_select_block ">
                                <div class="flex justify-between">
                                    <span class="specific_margin">Тип груза</span>
                                    <span class="specific_margin hide-show m-r-10">Объявленная ценность,₽ </span>
                                </div>
                                <div class="flex justify-between rs_item_block">
                                    <div class="select_lg">
                                        <multiselect
                                                v-model="cargo_type"
                                                placeholder="Не выбрана"
                                                :options="options">

                                        </multiselect>
                                    </div>
                                    <div class="flex justify-between _rs_mg_none form_block_item_select_block  m-t-15">
                                        <div class="select_sm rs_none">
                                            <span class="specific_margin">Класс опасности</span>
                                            <multiselect
                                                    v-model="danger"
                                                    placeholder="Не выбрана"
                                                    :options="options">

                                            </multiselect>
                                        </div>
                                        <div class="select_sm">
                                            <span class="specific_margin rs_none">Объявленная ценность,₽ </span>
                                            <input class="form_block_item_input" type="text" placeholder="≥ 1" v-model="price">
                                        </div>
                                    </div>
                                </div>
                            </div>




                        <div class="form-group m-t-15" >
                            <input  type="checkbox" name="c1" id="c1">
                            <label for="c1" @click="ShowTemperature()">Требуется температурный режим</label>


                        </div>



                        <div class="flex justify-between form_block_item_select_block " v-show="isChecked">
                            <div class="select_sm">
                                <span class="specific_margin">От, °C</span>
                                <input class="form_block_item_input" type="text">
                            </div>
                            <div class="select_sm">
                                <span class="specific_margin">До, °C</span>
                                <input class="form_block_item_input" type="text">
                            </div>

                        </div>


                    </div>
                    <div class="form_block_item m-t-45">
                        <div class="flex align-center m-b-15">
                            <span class="circle">4</span>
                            <h2 class="form_block_item_heading">Время</h2>
                        </div>
                        <div class="flex justify-between">
                            <span class="specific_margin">Когда прибыть на точку</span>
                            <span class="specific_margin">700 км в день</span>
                        </div>

                        <div class="flex flex-direction">
                            <div class="radio">
                                <input :checked="true"  type="radio" name="c1" id="r1" >
                                <label for="r1" @click="radioActive()">Адрес не указан</label>
                                <span class="status m-r-10" :class="{'active':isActive}">НЕ ВЫБРАНО</span>
                            </div>
                            <div class="radio">
                                <input  type="radio" name="c1" id="r2" >
                                <label for="r2" @click="radioActive()">Адрес не указан</label>

                                <span class="status m-r-10" :class="{'active':isNotActive}">НЕ ВЫБРАНО</span>
                            </div>
                            <span class="specific_margin m-t-15">Комментарий к заказу</span>
                            <textarea maxlength="300" class="textarea"  placeholder="Укажите особенности въезда на территорию склада или подъезда к адресу"> </textarea>
                        </div>
                    </div>
                </section>
            </form>
        </div>

    </div>
    
</template>

<script>
    import Multiselect from 'vue-multiselect'
    export default {
        name: "MainPage",
        components: {
            Multiselect
        },
        data: () => ({
            value: '',
            type:'',
            danger:'',
            price:'',
            from:'',
            to:'',
            cargo_type:'',
            options: ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4', 'Вариант 5'],
            typeOptions: ['Задняя', 'Задняя 2', 'Задняя 3'],
            isChecked:false,
            isActive:true,
            isNotActive:false,

        }),
        methods: {
            ShowTemperature() {
                this.isChecked = !this.isChecked;
            },
            radioActive() {
                this.isActive = !this.isActive;
                this.isNotActive = !this.isNotActive;
            },
        }
    }
</script>


<style lang="scss">
    @import "src/assets/sass/utilities/variables";

    /*
 * Prefixed by https://autoprefixer.github.io
 * PostCSS: v8.3.6,
 * Autoprefixer: v10.3.1
 * Browsers: last 4 version
 */

    .main_block {
        .form {
            max-width: 728px;
            width: 100%;
            position: relative;
            .info {
                position: absolute;
                background: $color-primary;
                padding: 24px;
                max-width: 356px;
                width: 100%;
                top: 0;
                left: 100%;
                margin-left: 16px;
            }

            .form_block_item {

                .circle {
                    width: 24px;
                    height: 24px;
                    background: #EF483E;
                    color: #ffffff;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-size: 16px;
                    font-weight: 600;
                }

                .form_block_item_heading {
                    margin-left: 8px;
                }

                .form_block_item_label {
                    font-size: $font-sm;
                    font-weight: 400;
                    line-height: $line-sm;
                    margin-bottom: 8px;
                }

                .form_block_item_input {
                    padding-left: 15px;
                    padding-right: 15px;
                    height: 44px;
                    width: 100%;

                    &:focus {
                        &::-webkit-input-placeholder {
                            opacity: 0;
                        }
                        &::-moz-placeholder {
                            opacity: 0;
                        }
                        &:-ms-input-placeholder {
                            opacity: 0;
                        }
                        &::-ms-input-placeholder {
                            opacity: 0;
                        }
                        &::placeholder {
                            opacity: 0;
                        }
                    }

                }

                .form_block_item_select_block {
                    max-width: 356px;
                    width: 100%;

                    .select_sm {
                        max-width: 172px;
                        width: 100%;

                    }

                }

                .select_lg {
                    max-width: 356px;
                    width: 100%;
                }

                .specific_margin {
                    margin-bottom: 8px;
                    display: inline-block;
                    font-size: $font-sm;
                    line-height: $line-sm;

                    &.hide-show {
                        display: none;
                    }
                }

                .radio {
                    width: 100%;
                    height: 44px;
                    background: $color-primary;
                    margin-bottom: 4px;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;

                    .status {
                        font-size: 13px;
                        line-height: 16px;
                        letter-spacing: 0.05em;
                        background: #717174;
                        border-radius: 2px;
                        margin-left: auto;
                        padding: 6px 13px 2px 13px;
                        opacity: .3;

                        &.active {
                            opacity: 1;
                        }

                    }
                }

                .textarea {
                    height: 80px;
                    padding: 13px 23px 0 14px;

                    &::-webkit-input-placeholder {

                        font-size: 15px;
                        line-height: 18px;
                        color: #CFCFCF;
                    }

                    &::-moz-placeholder {

                        font-size: 15px;
                        line-height: 18px;
                        color: #CFCFCF;
                    }

                    &:-ms-input-placeholder {

                        font-size: 15px;
                        line-height: 18px;
                        color: #CFCFCF;
                    }

                    &::-ms-input-placeholder {

                        font-size: 15px;
                        line-height: 18px;
                        color: #CFCFCF;
                    }

                    &::placeholder {

                        font-size: 15px;
                        line-height: 18px;
                        color: #CFCFCF;
                    }

                    &:focus {
                        &::-webkit-input-placeholder {
                            opacity: 0;
                        }
                        &::-moz-placeholder {
                            opacity: 0;
                        }
                        &:-ms-input-placeholder {
                            opacity: 0;
                        }
                        &::-ms-input-placeholder {
                            opacity: 0;
                        }
                        &::placeholder {
                            opacity: 0;
                        }
                    }

                    margin-bottom: 129px;
                }

                .multiselect__tags {
                    border-radius: 0;
                    border: none;
                    padding: 11px 40px 0 8px;
                    min-height: 44px;

                    .multiselect__single {
                        font-family: Helvetica-Neue, sans-serif;
                        font-size: 15px !important;
                        line-height: 18px;
                        color: #000000;
                    }
                }

                .multiselect__select {
                    &:before {
                        content: none;
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' viewBox='0 0 8 5' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1 0L4 3L7 0L8 1L4 5L0 1L1 0Z' fill='black'/%3E%3C/svg%3E");
                        width: 8px;
                        height: 5px;
                        right: 20px;
                        top: 50%;
                    }
                }

                .multiselect__element {
                    font-size: 14px !important;
                    line-height: 17px;
                    font-weight: 400;
                    color: #000000;

                    .multiselect__option {
                        min-height: 28px;
                        line-height: 28px;
                        padding: 0 0 0 12px;
                    }

                    .multiselect__option--highlight {
                        background: $color-secondary;

                        &:after {
                            display: none;
                        }
                    }

                }

            }

            .form-group {
                display: block;
                margin-bottom: 15px;

                input {
                    padding: 0;
                    height: initial;
                    width: initial;
                    margin-bottom: 0;
                    display: none;
                    cursor: pointer;
                }

                label {
                    position: relative;
                    cursor: pointer;

                    &:before {
                        content: '';
                        -webkit-appearance: none;
                        background-color: transparent;
                        border: 2px solid #ffffff;
                        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
                        width: 24px;
                        height: 24px;
                        display: inline-block;
                        position: relative;
                        vertical-align: middle;
                        cursor: pointer;
                        margin-right: 12px;
                    }

                }

            }

            .form-group input:checked + label:before {
                background: $color-secondary;
                border: 2px solid $color-secondary;

            }

            .form-group input:checked + label:after {
                content: "";
                display: block;
                position: absolute;
                top: -2px;
                left: 10px;
                width: 6px;
                height: 14px;
                border: solid #ffffff;
                border-width: 0 2px 2px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);


            }

            input[type="radio"] + label {
                display: inline-block;
                cursor: pointer;
                position: relative;
                padding-left: 26px;

                &:before {
                    content: "";
                    display: block;
                    width: 16px;
                    height: 16px;
                    margin-right: 14px;
                    position: absolute;
                    left: 0;
                    background-color: #fff;
                    border-radius: 50%;
                }
            }

            input[type="radio"] {
                &:checked + label:after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #343539;
                }

                &:checked + label:before {

                    background: $color-secondary;
                }
            }
            @supports (-webkit-appearance: none) or (-moz-appearance: none) {
                input[type='checkbox'],
                input[type='radio'] {
                    -webkit-appearance: none;
                    -moz-appearance: none;
                }
            }

        }
    }








</style>