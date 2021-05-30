import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/Specificationsrepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const createSpecificationService = new CreateSpecificationService(specificationsRepository);

  createSpecificationService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get("/", (request, response) => {
  const all = specificationsRepository.list();

  return response.json(all);
})

export { specificationsRoutes };

