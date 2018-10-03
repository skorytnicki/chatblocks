export function Router({currentRoute, children}) {
    return children
        .filter(child => child.path === currentRoute)
        .map(route => route.children);
}

export function Route({path, children}) {
    return {path, children};
}