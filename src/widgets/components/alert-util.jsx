import { Alert } from "antd";
import React from "react";

export function showNotice(type) {
    return <Alert message="Success Tips" type={type} showIcon className="fixed top-5 z-20"/>
}