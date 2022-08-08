import { Status } from '@prisma/client';

export const getStatusColor = (type: String) => {
  console.log(type)
  switch (type) {
    case Status.NEW: {
      return 'blue.600';
    }
    case Status.CLOSED: {
      return 'green.600';
    }
    case Status.RESOLVED: {
      return 'green.600';
    }
    case Status.WORKING: {
      return 'yellow.600';
    }
    case Status.HELP: {
      return 'red.600'
    }
    case Status.ERROR: {
      return 'red.600'
    }
    default: {
      return 'blue.600';
    }
  }
};

