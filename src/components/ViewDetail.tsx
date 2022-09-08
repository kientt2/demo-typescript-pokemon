import React, { useState } from "react";
import PropTypes from "prop-types";
import { PokemonDetail } from "../interface";


interface Props {
  item: PokemonDetail | null;
  click: () => void;
}

function ViewDetail(props: Props) {
  const { item, click } = props;
  if (!item ) {
    return null;
  }

  const { name, sprites, abilities } = item;
  const { front_default } = sprites;

  return (
    <div className="pokemon-list-detailed">
      <div className="detail-container">
        <p className="detail-close" onClick={props.click} >X</p>
        <div className="detail-info">
          <img src={front_default} alt="pokemon" className="detail-img" />
          <p className="detail-name">{name}</p>
        </div>
        <div className="detail-skill">
          <p className="detail-ability">Ablities:</p>
          <ul>
            {abilities.map((abi, key) => <li key={key}>{abi.ability.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;
