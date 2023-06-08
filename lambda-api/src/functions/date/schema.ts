export default {
  type: "object",
  properties: {
    endpoint: {
      type: "string",
    },
    categories: {
      type: "array",
      items: {
        type: "integer",
      },
    },
    settings: {
      type: "array",
      items: {
        type: "object",
        properties: {
          duration: {
            type: "object",
            properties: {
              value: {
                type: "integer",
              },
              unit: {
                type: "string",
                enum: ["year", "month", "day"],
              },
            },
            required: ["value", "unit"],
          },
          offset: {
            type: "object",
            properties: {
              value: {
                type: "integer",
              },
              unit: {
                type: "string",
                enum: ["year", "month", "day"],
              },
              direction: {
                type: "string",
                enum: ["before", "after"],
              },
            },
            required: ["value", "unit", "direction"],
          },
        },
        required: ["duration"],
      },
    },
  },
  required: ["endpoint", "settings"],
} as const;
