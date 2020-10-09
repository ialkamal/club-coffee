import React from "react";

const CoffeeForm = () => {
  return (
    <div>
      <form>
        <h3>Order Coffee</h3>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            data-cy="name"
            value=""
          />
        </label>
        <label htmlFor="tel">
          Name:
          <input
            type="text"
            id="tel"
            name="tel"
            placeholder="Enter telephone number"
            data-cy="tel"
            value=""
          />
        </label>
        <label>
          Type of Coffee
          <select>
            <option>Regular</option>
            <option>Latte</option>
            <option>Americano</option>
            <option>False</option>
            <option>Espresso</option>
          </select>
        </label>

        <label>
          Iced or Hot
          <select>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </label>

        <label>
          Choice of Milk
          <select>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </label>

        <label>
          Choice of Milk
          <input id="noFoam" name="noFoam" />
        </label>
      </form>
    </div>
  );
};

export default CoffeeForm;
