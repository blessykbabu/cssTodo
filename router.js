import { Router } from "express";
import * as controller from './controller.js'

 const router=Router()

 router.route('/add').post(controller.addData)
 router.route('/get').get(controller.getData)
 router.route('/remove/:id').delete(controller.deleteTask)
 router.route('/edit/:id').patch(controller.editTask)

 export default router;