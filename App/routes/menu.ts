import express from 'express'
import { getFullmenu } from './../controller/menu';

const menu = express.Router()

menu.get('/',getFullmenu)


export default menu
