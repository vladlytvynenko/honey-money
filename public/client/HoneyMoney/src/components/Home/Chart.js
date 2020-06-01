import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import * as d3 from 'd3';
import {Surface, Shape, Group} from '@react-native-community/art';

const color_palette = [
  '#EF476F',
  '#42BFDD',
  '#FFA5A5',
  '#00BD9D',
  '#FF66B3',
  '#F9C80E',
  '#B2F7EF',
  '#D9F2B4',
  '#EFABFF',
  '#FCF6BD',
  '#B388EB',
  '#F7DD72',
  '#D81159',
  '#FCF6BD',
  '#218380',
];

const userPurchases = [
  {
    itemName: 'Mountain Dew',
    price: 3,
  },
  {
    itemName: 'Shoes',
    price: 50,
  },
  {
    itemName: 'Kit Kat',
    price: 1,
  },
  {
    itemName: 'Taxi',
    price: 24,
  },
  {
    itemName: 'Watch',
    price: 100,
  },
  {
    itemName: 'Headphones',
    price: 15,
  },
  {
    itemName: 'Wine',
    price: 16,
  },
  {
    itemName: 'Mountain Dew',
    price: 3,
  },
  {
    itemName: 'Shoes',
    price: 50,
  },
  {
    itemName: 'Kit Kat',
    price: 1,
  },
  {
    itemName: 'Taxi',
    price: 24,
  },
  {
    itemName: 'Watch',
    price: 100,
  },
  {
    itemName: 'Headphones',
    price: 15,
  },
  {
    itemName: 'Wine',
    price: 16,
  },
];

const Chart = ({expense_categories = []}) => {
  const width = 250;
  const height = 250;

  const sectionAngles = d3.pie().value(d => d.expense_per_year)(
    expense_categories,
  );

  const path = d3
    .arc()
    .outerRadius(100)
    .innerRadius(40)
    .cornerRadius(5);

  const setColor = section => color_palette[section.index % 12];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 250,
      }}>
      <Surface width={width} height={height}>
        <Group x={width / 2} y={height / 2}>
          {sectionAngles.map(section => (
            <Shape
              key={section.index}
              d={path(section)}
              stroke="#000"
              fill={setColor(section)}
              strokeWidth={1}
            />
          ))}
        </Group>
      </Surface>
      <View style={{marginTop: 25}}>
        <FlatList
          data={sectionAngles.map(el => ({
            index: el.index,
            name: el.data.name,
            color: color_palette[el.index % 12],
          }))}
          renderItem={({item}) => (
            <View
              key={item.index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  marginHorizontal: 10,
                  backgroundColor: item.color,
                }}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: '#fff',
                }}>
                {item.name}
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        {/*  {sectionAngles.map(el => (
          <View
            key={el.index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                marginHorizontal: 10,
                backgroundColor: color_palette[el.index % 12],
              }}
            />
            <Text style={{color: '#fff'}}>{el.data.itemName}</Text>
          </View>
        ))}*/}
      </View>
    </View>
  );
};

export default Chart;
