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

      let request = await RequestModel.findOneByCode(validDataRegister.code);

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
    const id = req.params.id;

    let request = await RequestModel.findOneById(id);

    if (request) {
      request = await RequestModel.destroyRequest(id);

      return res.status(200).json({
        ok: true,
        msg: `La solicitud con el id ${id} fue eliminada con exito`,
      });
    }

    return res.status(400).json({
      ok: false,
      msg: "Hubo un error al eliminar la solicitud o ya no existe.",
    });
  };
}
