import React from "react";
import Create from './Create.jsx';
export default function Update(props) {
  // For this MVP, Update reuses the Create page (it loads existing data and saves over it)
  return <Create {...props} />;
}
