import { RequestModel } from "../../../models/request.js";
import { requestSchema } from "../../../schemas/requestSchema.js";

export class RequestController {
  static listRequest = async (req, res) => {
    const { search_term = "", page_number = 1, page_size = 10 } = req.query;

    try {
      const pagination = await RequestModel.findAll(
        search_term.toString(),
        Number(page_number),
        Number(page_size)
      );
      if (!pagination) {
        return res.status(403).json({
          message: "error",
        });
      }
      return res.status(200).json({
        ok: true,
        pagination,
      });
    } catch (error) {
      console.log(error);
    }
  }; //* SUCCESS

  static createRequest = async (req, res) => {
    try {
      const validDataRegister = await requestSchema.validate(req.body, {
        abortEarly: false,
      });

      let request = await RequestModel.findOne(validDataRegister.code);

      if (request) {
        return res.status(400).json({
          ok: false,
          msg: "El codigo ya fue usado, por favor use otro.",
        });
      }

      request = await RequestModel.registerRequest(validDataRegister);

      return res.status(201).json({ ok: true, solicitud: request });
    } catch (err) {
      res.status(400).json({ errors: err.errors });
    }
  };

  static deleteRequest = async (req, res) => {
    return res.status(200).json({
      message: "borrar",
    });
  };
}
