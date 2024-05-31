import {
    DeleteOutlined,
    DeleteTwoTone,
    EditOutlined,
    EditTwoTone,
    MoreOutlined,
    PlusCircleTwoTone,
    SettingOutlined,
    SettingTwoTone,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, Modal, Popover, Segmented, Switch } from "antd";
import React, { useEffect, useState } from "react";
import "../../style.scss";
import dayjs from "dayjs";
import { deleteWeChatBot } from "../data";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { TbClipboardCopy } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";

function WeChatBots({
    removeBot,
    official_id,
    type,
    title,
    updatedOn,
    onClickAddChatBot,
    image,
}) {
    // const navigate = useNavigate();
    const deleteBot = async (id) => {
        try {
            const res = await deleteWeChatBot({ official_id: id });
            removeBot(id);
        } catch (error) { }
    };

    const [wechatModal, setWechatModal] = useState(false);
    const [token] = useState("scanpen2024");
    const [serverUrl] = useState("https://chatgptmall.tech/wechat/events/");
    const [encodingAESKey] = useState("E3XZruVasWjvORGRkhgEPCUPOFUJ7keCHKI8qQZ0NwZ");
    const [configureModal, setConfigureModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formConfigure] = Form.useForm()

    const handleConfigureSave = async () => {
        try {
            await formConfigure.validateFields();
            const values = formConfigure.getFieldsValue();
            const data = {
                ...values,
                official_id: official_id,
            };
            setLoading(true);
            const response = await axios.post('http://localhost:8000/api/chatbots/wechat/configure/', data);
            console.log(response);
            toast.success('Bot integrated successfully!');
            setConfigureModal(false);
        } catch (error) {
            console.error('Error integrating bot:', error);
            toast.error('Error integrating bot. Please try again later.');
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    const content = (
        <div>
            {/* <p
                onClick={onClickAddChatBot}
                style={{ cursor: "pointer" }}
                className="my-2 text-sm d-flex align-items-center"
            >
                {" "}
                <EditTwoTone />
                <span className="m-0 ms-2">Edit</span>{" "}
            </p> */}
            <p
                // onClick={() =>
                //     navigate("/chatbots/integrate", { state: { chatbot_id } })
                // }
                style={{ cursor: "pointer" }}
                className="my-3 text-sm d-flex align-items-center"
                onClick={() => setConfigureModal(true)}
            >
                <SettingTwoTone />
                <span className="m-0 ms-2">Configure</span>{" "}
            </p>
            <p
                style={{ cursor: "pointer" }}
                className="my-3 text-sm d-flex align-items-center"
                onClick={() => setWechatModal(true)}
            >
                <SettingTwoTone />
                <span className="m-0 ms-2">Integrate</span>{" "}
            </p>
            <p
                style={{ cursor: "pointer" }}
                onClick={() => deleteBot(official_id)}
                className="my-2 text-sm d-flex align-items-center"
            >
                <DeleteTwoTone />
                <span className="m-0 ms-2">Delete</span>{" "}
            </p>
        </div>
    );
    return (
        <>
            {type == "show" && title ? (
                <div className="w-full chatbot-card m-2 max-w-sm bg-white  rounded-lg   p-2">
                    <div className="flex justify-end  pt-2">
                        <Col className="segmented-button-container m-0">
                            <Segmented
                                className="m-0"
                                size="small"
                                options={[
                                    {
                                        label: "ON",
                                        value: "on",
                                    },
                                    {
                                        label: "OFF",
                                        value: "off",
                                    },
                                ]}
                            ></Segmented>
                        </Col>
                        <Popover placement="bottom" title={""} content={content}>
                            <MoreOutlined style={{ fontSize: 20 }} />
                        </Popover>
                    </div>
                    <div className="flex flex-col p-2 pb-10 position-relative ">
                        <div className="image-wrapper overflow-hidden ">
                            {image && (
                                <img
                                    src={image}
                                    className="object-cover object-center h-full w-full"
                                    style={{ height: "80px", borderRadius: "50%", width: "80px", position: "absolute", top: "-26px" }}
                                />
                            )}
                        </div>
                        <div style={{ position: "absolute", bottom: "-80px" }}>
                            <h2 className="text-md text-xl font-semibold">{title}</h2>
                            {/* <p className='text-sm my-2'>{description}</p> */}
                        </div>

                        <div
                        >
                            <span className="absolute right-2 text-sm text-gray-500 " style={{ top: "120px" }} >
                                <span className="text-blue" style={{ color: "gray" }}>
                                    Modified On :{" "}
                                </span>{" "}
                                {dayjs(updatedOn).format("DD,MMM,YY")}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    onClick={onClickAddChatBot}
                    className="w-full  chatbot-card-add m-2 max-w-sm   rounded-lg   p-2"
                >
                    <div className="flex h-100 justify-content-center align-items-center flex-col p-2 ">
                        <PlusCircleTwoTone style={{ fontSize: 50 }} />
                        <h2 className="text-md mt-2 text-white font-semibold">
                            Add ChatBot
                        </h2>
                    </div>
                </div>
            )}
            <Modal open={wechatModal}
                className='chatbot-integrate-model chatbot-add-model'
                onCancel={() => setWechatModal(false)}
                okText={"Integrate"}
                closable={false}
            >
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-700">WeChat Integration</h2>
                        <p className='text-gray-500 text-sm'>
                            Log in to the official website of the Weixin Official Accounts Platform,
                            go to Development &gt; Basic Settings and check the agreement to become a developer.
                            Then click the Modify Configuration button to enter the following details:
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Token</label>
                        <div className="flex items-center">
                            <div className="w-full text-gray-700">
                                {token}
                            </div>
                            <TbClipboardCopy onClick={() => handleCopy(token)} color='black' size={20} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Server Address (URL)</label>
                        <div className="flex items-center">
                            <div className="w-full text-gray-700">
                                {serverUrl}
                            </div>
                            <TbClipboardCopy onClick={() => handleCopy(serverUrl)} color='black' size={20} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className="block text-sm font-medium text-gray-700">EncodingAESKey</label>
                        <div className="flex items-center">
                            <div className="w-full text-gray-700">
                                {encodingAESKey}
                            </div>
                            <TbClipboardCopy onClick={() => handleCopy(encodingAESKey)} color='black' size={20} />
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal open={configureModal}
                className='chatbot-integrate-model chatbot-add-model'
                onCancel={() => setConfigureModal(false)}
                onOk={handleConfigureSave}
                okButtonProps={{ disabled: loading }}
                okText={"Configure Bot"}
                closable={false}
            >
                <Form
                    labelCol={{ span: 8 }}
                    labelAlign='left'
                    colon={false}
                    form={formConfigure}
                    className='p-2 py-4'
                    requiredMark={false}
                    onFinish={handleConfigureSave}
                >


                    <Form.Item
                        label="App ID"
                        name="app_id"
                        rules={[{ required: true, message: 'Please enter the phone number ID!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Secret ID"
                        name="secret_id"
                        rules={[{ required: true, message: 'Please enter the access token!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>


        </>
    );
}

export default WeChatBots
WeChatBots.defaultProps = {
    type: "show",
};