import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  StatusBadge: componentLoader.add('StatusBadge', './status-badge'),
};

export { componentLoader, Components };
