import express from 'express'
import { getSomePagesById, addNewPage } from './../controller/pages';

const pages = express.Router()

pages.get('/:id',getSomePagesById)

pages.post('/',addNewPage)

export default pages