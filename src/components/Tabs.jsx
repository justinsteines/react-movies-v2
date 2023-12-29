import * as Tabs from '@radix-ui/react-tabs'

export default {
  ...Tabs,
  List: ({ ...props }) => (
    <Tabs.List className="flex justify-center gap-16" {...props} />
  ),
  Trigger: ({ isActive, ...props }) => (
    <Tabs.Trigger
      className={`border-y-4 border-t-transparent py-2 text-2xl font-bold ${
        isActive
          ? 'border-b-slate-100 text-slate-100'
          : 'border-b-transparent text-slate-400'
      }`}
      {...props}
    />
  ),
  Content: ({ ...props }) => <Tabs.Content className="my-8" {...props} />,
}
