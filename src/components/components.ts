import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add('Dashboard', './dashboard'),
  StatusBadge: componentLoader.add('StatusBadge', './status-badge'),
};

export { componentLoader, Components };
