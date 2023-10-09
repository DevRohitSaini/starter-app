import React, { useState, useEffect, createContext } from 'react';

export const UserContextData = createContext({
  storeData: {},
  setstoreData: () => { },
});
