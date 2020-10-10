import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const CoffeeNiceForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px auto;
  border-radius: 20px;
  border: 1px solid black;
  width: 600px;
  background-color: lightgreen;

  p {
    margin: 10px auto;
  }

  h3 {
    margin: 20px auto;
  }

  label {
    margin: 10px 30px;
  }

  label input {
    margin-left: 10px;
  }

  div label input {
    margin-left: 0px;
  }

  label select {
    margin-left: 10px;
  }

  label textarea {
    margin-top: 10px;
  }

  button {
    padding: 10px;
    margin: 10px auto;
    background: white;
    font-size: 1.2rem;
    :hover {
      opacity: 0.7;
    }
  }
`;

const OrderCard = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  background-color: lightyellow;
  margin: 10px auto;
  width: 300px;

  p {
    margin: 5px auto;
  }

  button {
    margin: 10px;
    padding: 10px;
    background-color: white;
    :hover {
      opacity: 0.7;
    }
  }
`;

const CoffeeForm = () => {
  const defaultOrder = {
    id: "",
    name: "",
    tel: "",
    coffeeType: "Regular",
    temperature: "Hot",
    milkChoice: "None",
    noFoam: false,
    cinnamon: false,
    caramelDrizzle: false,
    whippedCream: false,
    special: "",
  };

  const schema = yup.object().shape({
    name: yup.string().min(2).required("Enter a Name"),
    tel: yup
      .string()
      .matches(/^\d+$/, "Enter valid number")
      .min(10)
      .required("Enter a Phone Number"),
    coffeeType: yup.string().required("Select Coffee Type"),
    temperature: yup.string().required("Select Coffee Temperature"),
    milkChoice: yup.string().required("Select choice of Milk"),
    noFoam: yup.boolean(),
    cinnamon: yup.boolean(),
    caramelDrizzle: yup.boolean(),
    whippedCream: yup.boolean(),
    special: yup.string(),
  });

  const [order, setOrder] = useState(defaultOrder);
  const [orders, setOrders] = useState([]);
  const [edit, setEdit] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errors, setErrors] = useState({
    ...defaultOrder,
    noFoam: "",
    cinnamon: "",
    caramelDrizzle: "",
    whippedCream: "",
    coffeeType: "",
    temperature: "",
    milkChoice: "",
  });

  useEffect(() => {
    schema.isValid(order).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [order]);

  const validate = (e) => {
    e.persist();

    yup
      .reach(schema, e.target.name)
      .validate(e.target.value)
      .then((valid) => setErrors({ ...errors, [e.target.name]: "" }))
      .catch((error) => {
        setErrors({ ...errors, [e.target.name]: error.errors[0] });
      });
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setOrder({ ...order, [e.target.name]: value });
    validate(e);
  };

  const addOrder = (e) => {
    e.preventDefault();
    setOrder(defaultOrder);
    axios
      .post("https://reqres.in/api/users", order)
      .then((response) => {
        setOrders([...orders, response.data]);
      })
      .catch((err) => console.log(err));
  };

  const saveOrder = (e) => {
    e.preventDefault();
    const listOfOrders = orders.map((singleOrder) => {
      if (singleOrder.id === order.id) return order;
      else return singleOrder;
    });
    setOrders(listOfOrders);
    setOrder(defaultOrder);
    setEdit(false);

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((button) => {
      button.disabled = false;
    });
    document.querySelector(".Order__Button").textContent = "Order";
  };

  const editOrder = (myOrder) => {
    document.querySelector(".Order__Button").textContent = "Save";
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((button) => {
      button.disabled = true;
    });

    setEdit(true);
    setOrder(myOrder);
  };

  const cancelOrder = (myOrder) => {
    const listOfOrders = [...orders];
    listOfOrders.splice(listOfOrders.indexOf(myOrder), 1);
    setOrders(listOfOrders);
  };

  return (
    <div>
      <CoffeeNiceForm
        onSubmit={(e) => {
          if (edit === true) saveOrder(e);
          else addOrder(e);
        }}
      >
        <h3>Order Coffee</h3>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            data-cy="name"
            value={order.name || ""}
            onChange={handleChange}
          />
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.name}</p>
        <label htmlFor="tel">
          Tel:
          <input
            type="text"
            id="tel"
            name="tel"
            placeholder="Enter telephone number"
            data-cy="tel"
            value={order.tel || ""}
            onChange={handleChange}
          />
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.tel}</p>
        <label htmlFor="coffeeType">
          Type:
          <select
            id="coffeeType"
            name="coffeeType"
            data-cy="coffeeType"
            value={order.coffeeType || ""}
            onChange={handleChange}
          >
            <option value="Regular">Regular</option>
            <option value="Latte">Latte</option>
            <option value="Americano">Americano</option>
            <option value="Flat White">Flat White</option>
            <option value="Espresso">Espresso</option>
            <option value="Cappucino">Cappucino</option>
          </select>
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.coffeeType}</p>
        <label>
          Temperature:
          <select
            id="temperature"
            name="temperature"
            data-cy="temperature"
            value={order.temperature || ""}
            onChange={handleChange}
          >
            <option value="Iced">Iced</option>
            <option value="Hot">Hot</option>
          </select>
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.temperature}</p>
        <label htmlFor="milkChoice">
          Choice of Milk:
          <select
            id="milkChoice"
            name="milkChoice"
            data-cy="milkChoice"
            value={order.milkChoice || ""}
            onChange={handleChange}
          >
            <option value="None">None</option>
            <option value="Soy">Soy</option>
            <option value="Almond">Almond</option>
            <option value="Oat">Oat</option>
            <option value="Regular">Regular</option>
            <option value="Non-fat">Non-fat</option>
            <option value="Skim">Skim</option>
          </select>
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.milkChoice}</p>
        <p>Additions:</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="noFoam"
              checked={order.noFoam}
              value={order.noFoam}
              data-cy="noFoam"
              onChange={handleChange}
            />
            No Foam
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>{errors.noFoam}</p>
          <label>
            <input
              type="checkbox"
              name="cinnamon"
              checked={order.cinnamon}
              value={order.cinnamon}
              data-cy="cinnamon"
              onChange={handleChange}
            />
            Cinnamon
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>{errors.cinnamon}</p>
          <label>
            <input
              type="checkbox"
              name="caramelDrizzle"
              checked={order.caramelDrizzle}
              value={order.caramelDrizzle}
              data-cy="caramelDrizzle"
              onChange={handleChange}
            />
            Caramel Drizzle
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>
            {errors.caramelDrizzle}
          </p>
          <label>
            <input
              type="checkbox"
              name="whippedCream"
              checked={order.whippedCream}
              value={order.whippedCream}
              data-cy="whippedCream"
              onChange={handleChange}
            />
            Whipped Cream
          </label>
          <p style={{ color: "red", fontSize: ".8rem" }}>
            {errors.whippedCream}
          </p>
        </div>

        <label htmlFor="special">
          Special Instructions:
          <textarea
            id="special"
            name="special"
            data-cy="special"
            value={order.special || ""}
            onChange={handleChange}
            cols="60"
            rows="5"
          />
        </label>
        <p style={{ color: "red", fontSize: ".8rem" }}>{errors.special}</p>
        <button
          type="submit"
          name="submit"
          className="Order__Button"
          disabled={buttonDisabled}
          data-cy="submit"
        >
          Order
        </button>
      </CoffeeNiceForm>
      <h3>List of Orders</h3>
      {orders.map((myOrder) => {
        return (
          <OrderCard key={myOrder.id}>
            {/* <pre>{JSON.stringify(myOrder, 2, null)}</pre> */}
            <p>Name: {myOrder.name}</p>

            <p>Tel: {myOrder.tel}</p>

            <p>Type: {myOrder.coffeeType}</p>

            <p>Temperature: {myOrder.temperature}</p>

            <p>Choice of Milk: {myOrder.milkChoice}</p>

            <p>No Foam: {myOrder.noFoam === true ? "Yes" : "No"}</p>

            <p>Cinnamon: {myOrder.cinnamon === true ? "Yes" : "No"}</p>
            <p>
              Caramel Drizzle: {myOrder.caramelDrizzle === true ? "Yes" : "No"}
            </p>

            <p>
              Whipping Cream: {myOrder.whippedCream === true ? "Yes" : "No"}
            </p>
            <p>Special Instructions: {myOrder.special}</p>

            <button
              name="edit"
              className="edit"
              data-cy="edit"
              onClick={() => editOrder(myOrder)}
            >
              Edit
            </button>
            <button
              name="cancel"
              data-cy="cancel"
              onClick={() => cancelOrder(myOrder)}
            >
              Cancel
            </button>
          </OrderCard>
        );
      })}
    </div>
  );
};

export default CoffeeForm;
