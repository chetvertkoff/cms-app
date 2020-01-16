import express from 'express'
import { getSomePagesById, addNewPage,deleteSomePageById } from '../controller/pages';

const pages = express.Router()

pages.get('/:id',getSomePagesById)
pages.post('/',addNewPage)
pages.delete('/:id', deleteSomePageById)

export default pages