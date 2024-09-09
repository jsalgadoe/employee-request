export class RequestModel {
  static async findAll(search_term = "", page_number = 1, page_size = 10) {
    // console.log((page_number = 1), (page_size = 10));
    const offset = (page_number - 1) * page_size;
    try {
      const results = await prisma.request.findMany({
        skip: Number(offset),
        take: Number(page_size),
        where: {
          OR: [
            {
              code: {
                contains: search_term,
                mode: "insensitive",
              },
            },
            {
              employee: {
                full_name: {
                  contains: search_term,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        orderBy: {
          id: "desc",
        },
      });

      const totalResults = await prisma.request.count({
        where: {
          OR: [
            {
              code: {
                contains: search_term,
                mode: "insensitive",
              },
            },
            {
              employee: {
                full_name: {
                  contains: search_term,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
      });

      const total_pages = Math.ceil(totalResults / page_size);

      return {
        current_page: parseInt(page_number),
        total_pages: total_pages,
        total_results: totalResults,
        page_size: parseInt(page_size),
        has_next_page: page_number < total_pages,
        has_previous_page: page_number > 1,
        results: results,
      };
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }
  static async registerRequest({ code, resumen, description, employee_id }) {
    try {
      const request = await prisma.request.create({
        data: {
          code: code,
          resumen: resumen,
          description: description,
          employee: {
            connect: { id: employee_id },
          },
        },
        select: {
          id: true,
          code: true,
          resumen: true,
          description: true,
          employee: {
            select: {
              full_name: true,
              // Puedes agregar otros campos del modelo Employee que desees incluir
            },
          },
        },
      });
      return request;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }
  static async findOne(code) {
    try {
      const request = await prisma.request.findUnique({
        where: { code: code },
      });
      return request;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }
}
