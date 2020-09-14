const state = {
  entities: {
    initiatives: {
      I1: {
        id: "I1",
        description: "Complete general DPIA"
      },
      I2: {
        id: "I2",
        description: "Review risk controls"
      }
    },
    tasks: {
      T0: {
        id: "T0",
        description: "This is my first to do",
        users: ["U0", "U1"],
        completed: true,
        initiatives: ["I1"]
      },
      T1: {
        id: "T1",
        description: "This is my second to do",
        users: ["U2"],
        completed: false,
        initiatives: ["I2"]
      },
      T2: {
        id: "T2",
        description: "This is my last to do",
        users: ["U1"],
        completed: false,
        initiatives: ["I1"]
      }
    },
    users: {
      U0: {
        id: "U0",
        name: "H"
      },
      U1: {
        id: "U1",
        name: "T"
      },
      U2: {
        id: "U2",
        name: "HT"
      }
    }
  }
};

export default state;
