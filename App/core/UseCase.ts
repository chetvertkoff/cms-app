export default interface UseCase<InPort, OutPort> {
    execute(port?: InPort): Promise<OutPort>
}