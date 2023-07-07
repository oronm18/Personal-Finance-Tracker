from common.budget_api.budget_api_requests import run_server
import argparse


def main():
    parser = argparse.ArgumentParser(description='Process build path.')
    parser.add_argument('build_path', type=str, help='The path to the build folder.')

    args = parser.parse_args()
    run_server(args.build_path)


if __name__ == '__main__':
    main()
