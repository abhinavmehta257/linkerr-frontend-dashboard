import React, { useEffect } from 'react'
import { useState } from 'react'
// import {PopoverPicker} from 'react-color'
import {useDispatch, useSelector} from 'react-redux'
import {updateAppearence} from '../../../redux'
import ThemeSample from './ThemeSample'
import Slider from '@mui/material/Slider';
import { PopoverPicker} from './PopOverCoorPicker';
function CustomizeTheme() {

    const [pageAppearance, setAppearance] = useState(useSelector(state => state.data.data.appearance));
    console.log(pageAppearance);
    const [bodyBackgroundColor, setBodyBackgroundColor] = React.useState(pageAppearance.bodyStyle.backgroundColor);
    const [bodyColor, setBodyColor] = React.useState(pageAppearance.bodyStyle.color);
    const [cardBackgroundColor, setCardBackgroundColor] = React.useState(pageAppearance.cardStyle.backgroundColor);
    const [cardColor, setCardColor] = React.useState(pageAppearance.cardStyle.color);
    const [cardBorderColor, setCardBorderColor] = React.useState(pageAppearance.cardStyle.borderColor);
    const [cardBorderRadius, setCardBorderRadius] = React.useState(pageAppearance.cardStyle.borderRadius);
    // const [cardBorderWidth, setCardBorderWidth] = React.useState(pageAppearance.cardStyle.borderWidth);
    // const [cardShadow, setCardShadow] = React.useState(pageAppearance.cardStyle.shadow);
    const dispatch = useDispatch();

    const handleColorChange = (color, event) => {
        let app = {
            bodyStyle: {
                backgroundColor: bodyBackgroundColor,
                color: bodyColor,
            },
            cardStyle: {
                backgroundColor: cardBackgroundColor,
                color: cardColor,
                borderColor: cardBorderColor,
                borderRadius: cardBorderRadius,
                borderWidth: pageAppearance.cardStyle.borderWidth,
                shadow: pageAppearance.cardStyle.shadow,
            },
        };
        console.log(app);
        dispatch(updateAppearence({appearance:app}));
    }

    const handleChangeSlider = (event, newValue) => {
        setCardBorderRadius(`${newValue}px`);
        // console.log(newValue);
    }

    useEffect(() => {
    }, [pageAppearance]);

  return (
    <div className=''>
        <h1 className='text-3xl mb-3'>
            Customize Theme
        </h1>
        
        <div className='grid grid-cols-6 gap-5'>
            <div className='col-span-4'>
                <h1 className='text-xl mb-2'>
                    Body Style
                </h1>
                <div className='grid grid-cols-2  gap-5'>
                    <div className=''>
                        Background Color:
                        <PopoverPicker
                            color={bodyBackgroundColor}
                            id = 'bodyBackgroundColor'
                            onChange={(color=>setBodyBackgroundColor(color))}
                        />
                    </div>
                    <div className=''>
                        Text Color:
                        <PopoverPicker
                            id = 'bodyColor'
                            onChange={(color=>setBodyColor(color))}
                            color={bodyColor}
                        />
                    </div>
                </div>
                <h1 className='text-xl mb-2 mt-5'>
                    Card Style
                </h1>
                <div className='grid grid-cols-2 gap-5'>
                    <div className=''>
                        Background Color:
                        <PopoverPicker
                            id = 'cardBackgroundColor'
                            onChange={(color=>setCardBackgroundColor(color))}
                            color={cardBackgroundColor}
                        />
                    </div>
                    <div className=''>
                        Boarder Color:
                        <PopoverPicker
                            id = 'cardBorderColor'
                            onChange={(color=>setCardBorderColor(color))}
                            color={cardBorderColor}
                        />
                    </div>
                    <div className=''>
                        Text Color:
                        <PopoverPicker
                            id = 'cardColor'
                            onChange={(color=>setCardColor(color))}
                            color={cardColor}
                        />
                    </div>
                    <div className=''>
                        Border Radius:
                        <Slider value={cardBorderRadius.split('px')[0]} min={0} max={30} step={5} onChange={handleChangeSlider} aria-label="Default" valueLabelDisplay="auto" />                        
                    </div>
                </div>
            </div>
            <div className='col-span-2 text-center'>
                <p className='mb-1'>Theme Preview</p>
                <ThemeSample theme={{appearance:{
                    bodyStyle: {
                        backgroundColor: bodyBackgroundColor,
                        color: bodyColor,
                    },
                    cardStyle: {
                        backgroundColor: cardBackgroundColor,
                        color: cardColor,
                        borderColor: cardBorderColor,
                        borderRadius: cardBorderRadius,
                        borderWidth: pageAppearance.cardStyle.borderWidth,
                        shadow: pageAppearance.cardStyle.shadow,
                    },
                }}}/>
            </div>
        </div>

        <button className='p-2 pl-4 pr-4 dark:bg-gray-800 rounded text-white mt-3' onClick={()=>{handleColorChange()}}>Update theme</button>
    </div>
  )
}

export default CustomizeTheme