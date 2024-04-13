import React from "react";
import "./main.css";
export default function UpdateForm() {
    return (
        // <!-- 图书上传 -->
        <div class="item-me no-first" data-id="content-2">
            {/* <!-- 动画框 --> */}
            <div class="card">
                {/* <!-- 大盒子 --> */}
                <div>
                    <form id="upload-form">
                        <div class="son-div">
                            <div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    class="form--input"
                                    placeholder="username"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    pattern="\d{11}"
                                    class="form--input"
                                    placeholder="phone"
                                    required
                                />
                            </div>

                            {/* // <!-- 书籍信息 --> */}
                            <div>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    class="form--input"
                                    placeholder="appname"
                                    required
                                />
                            </div>
                        </div>
                        {/* // <!-- 小盒子 --> */}
                        {/* // <!-- 书籍介绍 --> */}
                        <div>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                class="form--input"
                                placeholder="version-Description"
                                required
                            ></textarea>
                        </div>

                        {/* // <!-- 小盒子 --> */}
                        <div class="son-div">
                            {/* <!-- 小小盒子 --> */}
                            <div class="img-text-y">
                                {/* <!-- 图片上传 --> */}
                                <div class="form-img">
                                    <span class="form-title">Logo</span>
                                    <p class="form-paragraph">
                                        File should be an image
                                    </p>
                                    <label
                                        for="file-input"
                                        class="drop-container"
                                    >
                                        <span class="drop-title">
                                            Drop File Here
                                        </span>
                                        or
                                        <input
                                            type="file"
                                            accept="image/*"
                                            required=""
                                            class="form--input"
                                            id="file-img-input-1"
                                        />
                                    </label>

                                    {/* <!-- 按钮 --> */}
                                    <button class="button_reset" type="button">
                                        <span class="button_lg button_img_reset">
                                            <span class="button_sl"></span>
                                            <span class="button_text">
                                                取消上传
                                            </span>
                                        </span>
                                    </button>
                                </div>
                                {/* <!-- 文件上传 --> */}
                                <div class="form-img">
                                    <span class="form-title">File</span>
                                    <p class="form-paragraph">
                                        File should be an text
                                    </p>
                                    <label
                                        for="file-input"
                                        class="drop-container"
                                    >
                                        <span class="drop-title">
                                            Drop File Here
                                        </span>
                                        or
                                        <input
                                            type="file"
                                            accept="text/*"
                                            required=""
                                            id="file-img-input-2"
                                            class="form--input"
                                        />
                                    </label>
                                    <button class="button_reset" type="button">
                                        <span class="button_lg button_text_reset">
                                            <span class="button_sl"></span>
                                            <span class="button_text">
                                                取消上传
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* <!-- 小小盒子 --> */}
                            <div class="img-text-x">
                                {/* <!-- 出版价格--> */}
                                <div>
                                    <input
                                        type="text"
                                        id="publisher"
                                        name="publisher"
                                        class="form--input"
                                        placeholder="price"
                                        required
                                    />
                                </div>
                                {/* <!-- 出版版本 --> */}
                                <div>
                                    <input
                                        type="text"
                                        id="publish-time"
                                        name="publisher"
                                        class="form--input"
                                        placeholder="app-version"
                                        required
                                    />
                                </div>
                                {/* <!-- 同意协议 --> */}
                                <div class="form--marketing">
                                    <input id="okayToEmail" type="checkbox" />
                                    <label for="okayToEmail" class="checkbox">
                                        I agree to QG-User-Agreement.
                                    </label>
                                </div>
                                {/* <!-- 提交按钮 --> */}
                                <div>
                                    <button type="submit" class="form--submit">
                                        提交
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
