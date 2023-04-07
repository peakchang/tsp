<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    const testUpdate = () => {};
    const choice_btn = ["업데이트"];
</script>

<FixedButton on:update={testUpdate} {choice_btn} />
<div class="suit-font px-2 pt-16 mb-28" class:pl-44={!$pc_sidebar}>


    <div class="mt-8">
        <table
            class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
        >
            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품코드 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    8848484
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품명 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 통신방식 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <select
                        class="border border-slate-400 py-1 px-3 rounded-md"
                    >
                        <option value="5G">5G</option>
                        <option value="LTE">LTE</option>
                    </select>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품가격 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md"
                    /> 원
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 출력순서 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 제조사 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 브랜드 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12">
                    종속모델상태
                </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <label>
                        메인상품 체크 : <input type="checkbox" />
                    </label>

                    <select
                        class="border border-slate-400 py-1 px-3 rounded-md ml-5"
                    >
                        <option value="5G">5G</option>
                        <option value="LTE">LTE</option>
                    </select>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 판매가능 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <label>
                        판매 여부 : <input type="checkbox" />
                    </label>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 연관상품 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <select
                        class="border border-slate-400 py-1 px-3 rounded-md"
                    >
                        <option value="5G">5G</option>
                        <option value="LTE">LTE</option>
                    </select>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 체크사항 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <label>
                        <input type="checkbox" /> <span>지식쇼핑 입점여부</span>
                    </label>

                    <label class="ml-5">
                        <input type="checkbox" /> <span>선약할인 적용여부</span>
                    </label>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12">
                    지식쇼핑 카테고리ID
                </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품설명 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <!-- <Editor /> -->
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> SK 지원금 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <div class="grid grid-cols-2 lg:grid-cols-3">
                        <div class="text-xs">
                            출고가 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            용량 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            MNP 공시할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            MNP 선약할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            기변 공시할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            기변 선약할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> KT 지원금 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <div class="grid grid-cols-2 lg:grid-cols-3">
                        <div class="text-xs">
                            출고가 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            용량 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            MNP 공시할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            MNP 선약할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            기변 공시할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            기변 선약할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12">
                    LG U+ 지원금
                </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <div class="grid grid-cols-2 lg:grid-cols-3">
                        <div class="text-xs">
                            출고가 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            용량 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            MNP 공시할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            MNP 선약할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            기변 공시할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>

                        <div class="text-xs">
                            기변 선약할인 <br />
                            <input
                                type="text"
                                class="border border-slate-400 py-1 rounded-md w-11/12"
                            />
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 출력 기준 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <div class="grid grid-cols-2 lg:grid-cols-4">
                        <div>
                            <span>기존통신사 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>

                        <div>
                            <span class="ml-3">할인유형 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>

                        <div>
                            <span class="ml-3">용량 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>

                        <div>
                            <span class="ml-3">요금제 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 색상 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>
            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 색상코드 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12">
                    이미지 리스트
                </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                </td>
            </tr>
        </table>
    </div>
</div>
