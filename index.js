import * as React from 'react'
import Animated, {
    withTiming,
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

export default class A extends React.Component {
    render() {
        const {
            component,
            animate,
            gravity,
            ground,
            up_velocity,
            damping,
            bounce_cycle,
        } = this.props;
        return (
            <BounceView
                component={component}
                animate={animate}
                gravity={gravity}
                ground={ground}
                up_velocity={up_velocity}
                damping={damping}
                bounce_cycle={bounce_cycle}
            ></BounceView>
        )
    }
}
function BounceView({
    component,
    animate,
    gravity = 1600,
    ground = 0,
    up_velocity = 800,
    damping = 2,
    bounce_cycle = 5,
}) {
    React.useEffect(() => {
        animate.current = () => {
            startAnimation();
        };
    }, []);
    const t_progress = useSharedValue(0);
    const rStyle = useAnimatedStyle(() => {
        const h = ground;
        const a = gravity / 2;
        const c = up_velocity / 2 / a;
        const k = -a * c ** 2;
        let y_pos = a * (t_progress.value - c) ** 2 + k;
        const t0 = Math.sqrt((h - k) / a) + c;
        if (t_progress.value <= t0) {
            return {
                transform: [{ translateY: y_pos }],
            };
        }
        const vf = 2 * a * (t0 - c);
        const time_intervals = [t0, vf / a / damping + t0];
        for (let i = 0; i < bounce_cycle - 1; i++) {
            time_intervals.push(
                (time_intervals[i + 1] - time_intervals[i]) / damping +
                time_intervals[i + 1]
            );
        }
        let hasInterval = false;
        for (let i = 1; i < bounce_cycle + 1; i++) {
            if (t_progress.value <= time_intervals[i]) {
                const _k = -a * ((time_intervals[i] - time_intervals[i - 1]) / 2) ** 2;
                y_pos = a * (t_progress.value - time_intervals[i - 1] - (time_intervals[i] - time_intervals[i - 1]) / 2) ** 2 + _k + h;
                hasInterval = true;
                break;
            }
        }
        if (hasInterval) {
            return {
                transform: [{ translateY: y_pos }],
            };
        }
        return {
            transform: [{ translateY: h }],
        };
    });
    function startAnimation() {
        t_progress.value = 0;
        t_progress.value = withTiming(10, { duration: 5000 });
    }
    return <Animated.View style={rStyle}>{component}</Animated.View>;
}