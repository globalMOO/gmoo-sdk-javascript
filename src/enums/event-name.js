// File: src/enums/event-name.js
export const EventName = {
  PROJECT_CREATED: 'project.created',
  INVERSE_SUGGESTED: 'inverse.suggested',

  dataType(name) {
    const types = {
      [this.PROJECT_CREATED]: 'Project',
      [this.INVERSE_SUGGESTED]: 'Inverse'
    };
    return types[name];
  }
};
