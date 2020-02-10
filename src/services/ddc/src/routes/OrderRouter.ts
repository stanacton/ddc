import {Request, Response} from "express";
import {Router} from "express";
import {BaseRouter} from "./BaseRouter";
import {Order} from "../models";

export default class OrderRouter extends BaseRouter<Order> {
}
