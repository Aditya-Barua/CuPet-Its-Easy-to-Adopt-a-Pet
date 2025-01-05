import React from 'react';
import Card from "./Card";

const PlanningToAdoptAPet = () => {
  return (
    <div className='planning-container'>
        <h1>Planning to gift a home to a Pet?</h1>
        <div className='boxes-container'>
            <Card title="The Happiness of Adopting a Pet" description="Adopting a pet is a heartwarming experience that brings joy not only to you but also to the animal you welcome into your home. There's something truly special about giving a loving home to a furry friend."/>
            <Card title="Thinking About Adopting a Pet?" description="If you're considering getting a pet, adoption is a great choice. It’s important to take time to think, plan, and find the right pet for your home. The love and happiness they bring make every effort worthwhile."/>
            <Card title="The Comfort Pets Provide" description="Pets have a unique way of improving our lives. They offer companionship, reduce stress, and bring emotional comfort, helping us feel happier and healthier every day."/>
        </div>
    </div>
  )
}

export default PlanningToAdoptAPet;